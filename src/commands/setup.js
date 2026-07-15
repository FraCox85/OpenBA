import chalk from 'chalk';
import enquirer from 'enquirer';
const { prompt } = enquirer;
import ora from 'ora';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { installSkill, writeConfig, readConfig, getPackageVersion } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  OpenBA — Business Analyst-first spec framework'));
  console.log(chalk.dim('  https://github.com/FraCox85/OpenBA\n'));

  // Check se già configurato
  const existing = readConfig(targetRoot);
  if (existing) {
    const toolList = (existing.tools ?? [existing.tool]).filter(Boolean).join(', ');
    console.log(chalk.yellow('  ⚠  OpenBA is already set up in this project.'));
    console.log(chalk.dim(`     Tools: ${toolList} | Skills: ${existing.skills.length} installed\n`));
    const { proceed } = await prompt({
      type: 'confirm',
      name: 'proceed',
      message: 'Run setup again? This will add new tools without removing existing ones.',
      initial: false
    });
    if (!proceed) {
      console.log(chalk.dim('\n  Use `openba update` to refresh skill files instead.\n'));
      process.exit(0);
    }
  }

  // Selezione tool (multipla)
  console.log(chalk.bold('  Select your AI coding assistants\n'));
  console.log(chalk.dim('  Use space to toggle, enter to confirm.\n'));

  const toolChoices = Object.values(TOOLS).map(t => ({
    name: t.id,
    message: `${t.name.padEnd(20)} ${chalk.dim(t.description)}`
  }));

  const { toolIds } = await prompt({
    type: 'multiselect',
    name: 'toolIds',
    message: 'Which AI tools do you use?',
    choices: toolChoices
  });

  if (!toolIds || toolIds.length === 0) {
    console.log(chalk.red('\n  ✗ No tools selected. Aborting.\n'));
    process.exit(1);
  }

  const selectedTools = toolIds.map(id => TOOLS[id]);
  console.log(chalk.green(`\n  ✓ Selected: ${selectedTools.map(t => t.name).join(', ')}`));

  // Tutte le skill del pipeline v2 vengono sempre installate
  const selectedSkillIds = SKILLS.map(s => s.id);

  console.log(chalk.dim(`\n  Installing ${selectedSkillIds.length} skills for ${selectedTools.length} tool(s)...\n`));

  // Installa per ogni tool selezionato
  const spinner = ora({ text: 'Installing skills...', color: 'cyan' }).start();
  const resultsByTool = [];

  for (const tool of selectedTools) {
    const results = [];
    for (const skillId of selectedSkillIds) {
      const result = installSkill(skillId, tool, targetRoot);
      results.push({ skillId, ...result });
      spinner.text = `[${tool.name}] Installing ${skillId}...`;
    }
    resultsByTool.push({ tool, results });
  }

  spinner.succeed('Skills installed');

  // Report per tool
  console.log('');
  for (const { tool, results } of resultsByTool) {
    console.log(chalk.bold(`  ${tool.name}:`));
    const ok = results.filter(r => r.ok);
    const failed = results.filter(r => !r.ok);
    ok.forEach(r => console.log(chalk.green(`    ✓ ${r.skillId}`)));
    failed.forEach(r => console.log(chalk.red(`    ✗ ${r.skillId} — ${r.reason}`)));
  }

  // Skills ok (union di tutti i tool — deduplicata)
  const allOkSkills = [...new Set(
    resultsByTool.flatMap(({ results }) => results.filter(r => r.ok).map(r => r.skillId))
  )];

  // Salva config
  writeConfig(targetRoot, {
    version: getPackageVersion(),
    tools: toolIds,
    skills: allOkSkills,
    installedAt: new Date().toISOString()
  });

  // Summary
  console.log('');
  console.log(chalk.bold('  Setup complete!\n'));

  // Summary paths per tool
  for (const tool of selectedTools) {
    if (tool.promptsPath) {
      // GitHub Copilot
      console.log(chalk.dim(`  [${tool.name}] Prompts → ${tool.promptsPath}/   (usa /openba-xxx in Copilot Chat)`));
      console.log(chalk.dim(`  [${tool.name}] Skills  → ${tool.skillsPath}/`));
    } else if (tool.commandsPath && tool.commandExt === '.toml') {
      // Gemini CLI
      console.log(chalk.dim(`  [${tool.name}] Commands → ${tool.commandsPath}/   (file .toml per ogni skill)`));
      console.log(chalk.dim(`  [${tool.name}] Skills   → ${tool.skillsPath}/`));
    } else if (tool.commandsPath) {
      // Claude Code / Antigravity
      console.log(chalk.dim(`  [${tool.name}] Commands → ${tool.commandsPath}/`));
      console.log(chalk.dim(`  [${tool.name}] Skills   → ${tool.skillsPath}/`));
    } else if (tool.skillsPath) {
      // Codex, Cursor, Windsurf
      console.log(chalk.dim(`  [${tool.name}] Skills → ${tool.skillsPath}/`));
    }
  }

  console.log(chalk.dim('  Config saved to: .openba/config.json'));
  console.log('');
  console.log('  Next steps:');
  console.log(chalk.cyan('  1.') + ' Open your project in your AI tool');
  console.log(chalk.cyan('  2.') + ' Run openba-init to create the .openba workspace (it will ask which AI platform you use)');
  console.log(chalk.cyan('  3.') + ' Run openba-discover to start situation analysis and capture your first Need');
  console.log(chalk.cyan('  4.') + ' Follow the pipeline: discover → elicit → specify → decompose → groom → trace');
  console.log('');
  console.log(chalk.dim('  Docs: https://github.com/FraCox85/OpenBA\n'));
}
