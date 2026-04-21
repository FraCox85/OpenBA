import chalk from 'chalk';
import enquirer from 'enquirer';
const { prompt } = enquirer;
import ora from 'ora';
import { cwd } from 'process';
import { TOOLS, SKILLS, CORE_SKILLS, SKILL_GROUPS } from '../lib/tools.js';
import { installSkill, writeConfig, readConfig, getPackageVersion } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  OpenBA — Business Analyst-first spec framework'));
  console.log(chalk.dim('  https://github.com/FraCox85/OpenBA\n'));

  // Check se già configurato
  const existing = readConfig(targetRoot);
  if (existing) {
    console.log(chalk.yellow('  ⚠  OpenBA is already set up in this project.'));
    console.log(chalk.dim(`     Tool: ${existing.tool} | Skills: ${existing.skills.length} installed\n`));
    const { proceed } = await prompt({
      type: 'confirm',
      name: 'proceed',
      message: 'Run setup again? This will add new tools or skills without removing existing ones.',
      initial: false
    });
    if (!proceed) {
      console.log(chalk.dim('\n  Use `openba update` to refresh skill files instead.\n'));
      process.exit(0);
    }
  }

  // Step 1 — Selezione tool
  console.log(chalk.bold('  Step 1 of 2 — Select your AI coding assistant\n'));

  const toolChoices = Object.values(TOOLS).map(t => ({
    name: t.id,
    message: `${t.name.padEnd(20)} ${chalk.dim(t.description)}`
  }));

  const { toolId } = await prompt({
    type: 'select',
    name: 'toolId',
    message: 'Which AI tool do you use?',
    choices: toolChoices
  });

  const tool = TOOLS[toolId];
  console.log(chalk.green(`\n  ✓ Selected: ${tool.name}`));

  // Step 2 — Selezione skill
  console.log(chalk.bold('\n  Step 2 of 2 — Select skills to install\n'));
  console.log(chalk.dim('  Core skills are always installed. Choose additional skill groups.\n'));

  // Raggruppa per gruppo (escludi core — sempre incluse)
  const optionalGroups = Object.entries(SKILL_GROUPS)
    .filter(([g]) => g !== 'core')
    .map(([groupId, groupName]) => {
      const groupSkills = SKILLS.filter(s => s.group === groupId);
      return {
        name: groupId,
        message: `${groupName.padEnd(30)} ${chalk.dim(`(${groupSkills.length} skills)`)}`,
        hint: groupSkills.map(s => s.id).join(', ')
      };
    });

  const { selectedGroups } = await prompt({
    type: 'multiselect',
    name: 'selectedGroups',
    message: 'Select skill groups (space to toggle, enter to confirm):',
    choices: optionalGroups,
    initial: ['epic', 'feature', 'pbi'] // default: tutto
  });

  // Costruisci lista skill finale
  const selectedSkillIds = [
    ...CORE_SKILLS,
    ...SKILLS
      .filter(s => selectedGroups.includes(s.group))
      .map(s => s.id)
  ];

  console.log(chalk.dim(`\n  Installing ${selectedSkillIds.length} skills for ${tool.name}...\n`));

  // Installa
  const spinner = ora({ text: 'Installing skills...', color: 'cyan' }).start();
  const results = [];

  for (const skillId of selectedSkillIds) {
    const result = installSkill(skillId, tool, targetRoot);
    results.push({ skillId, ...result });
    spinner.text = `Installing ${skillId}...`;
  }

  spinner.succeed('Skills installed');

  // Report
  const ok = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);

  console.log('');
  ok.forEach(r => console.log(chalk.green(`  ✓ ${r.skillId}`)));
  failed.forEach(r => console.log(chalk.red(`  ✗ ${r.skillId} — ${r.reason}`)));

  // Salva config
  writeConfig(targetRoot, {
    version: getPackageVersion(),
    tool: toolId,
    skills: ok.map(r => r.skillId),
    installedAt: new Date().toISOString()
  });

  // Summary
  console.log('');
  console.log(chalk.bold('  Setup complete!\n'));

  if (tool.skillsPath) {
    console.log(chalk.dim(`  Skills installed to: ${tool.skillsPath}/`));
  } else {
    console.log(chalk.dim(`  Skills appended to: ${tool.agentsFile}`));
  }

  console.log(chalk.dim('  Config saved to: .openba/config.json'));
  console.log('');
  console.log('  Next steps:');
  console.log(chalk.cyan('  1.') + ' Open your project in your AI tool');
  console.log(chalk.cyan('  2.') + ' Run oba-init to initialize the OpenBA workspace');
  console.log(chalk.cyan('  3.') + ' Run oba-bcm init to map your business capabilities');
  console.log(chalk.cyan('  4.') + ' Run oba-create-epic to start your first epic');
  console.log('');
  console.log(chalk.dim('  Docs: https://github.com/FraCox85/OpenBA\n'));
}
