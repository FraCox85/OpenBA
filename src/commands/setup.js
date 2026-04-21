import chalk from 'chalk';
import enquirer from 'enquirer';
const { prompt } = enquirer;
import ora from 'ora';
import { cwd } from 'process';
import { TOOLS, SKILLS, CORE_SKILLS, SKILL_GROUPS } from '../lib/tools.js';
import { installSkill, writeConfig, readConfig, getPackageVersion, generateCopilotInstructions, generateAgentInstructions } from '../lib/installer.js';

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
      message: 'Run setup again? This will add new tools or skills without removing existing ones.',
      initial: false
    });
    if (!proceed) {
      console.log(chalk.dim('\n  Use `openba update` to refresh skill files instead.\n'));
      process.exit(0);
    }
  }

  // Step 1 — Selezione tool (multipla)
  console.log(chalk.bold('  Step 1 of 2 — Select your AI coding assistants\n'));
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
      console.log(chalk.dim(`  [${tool.name}] Prompts → ${tool.promptsPath}/   (usa /oba-xxx in Copilot Chat)`));
      console.log(chalk.dim(`  [${tool.name}] Skills  → ${tool.skillsPath}/`));
    } else if (tool.commandsPath && tool.commandExt === '.toml') {
      // Gemini CLI
      console.log(chalk.dim(`  [${tool.name}] Commands → ${tool.commandsPath}/   (file .toml per ogni skill)`));
      console.log(chalk.dim(`  [${tool.name}] Skills   → ${tool.skillsPath}/`));
    } else if (tool.commandsPath) {
      // Claude Code
      console.log(chalk.dim(`  [${tool.name}] Commands → ${tool.commandsPath}/   (usa /openba:xxx in Claude)`));
      console.log(chalk.dim(`  [${tool.name}] Skills   → ${tool.skillsPath}/`));
    } else if (tool.skillsPath) {
      // Codex, Antigravity, Cursor, Windsurf
      console.log(chalk.dim(`  [${tool.name}] Skills → ${tool.skillsPath}/`));
    } else {
      console.log(chalk.dim(`  [${tool.name}] Skills appended to: ${tool.agentsFile}`));
    }
  }

  // Genera istruzioni per Copilot
  const hasCopilot = selectedTools.some(t => t.copilotInstructions);
  if (hasCopilot) {
    const ci = generateCopilotInstructions(targetRoot);
    if (ci.skipped) {
      console.log(chalk.dim(`  [GitHub Copilot] copilot-instructions.md already exists — not overwritten`));
    } else {
      console.log(chalk.green(`  [GitHub Copilot] ✓ Template created: ${ci.path}`));
      console.log(chalk.dim('                      Edit it to add your project-specific BA context.'));
    }
  }

  // Genera file di istruzioni root (CLAUDE.md, GEMINI.md, AGENTS.md) per i tool che lo richiedono
  for (const tool of selectedTools) {
    if (tool.instructionFile) {
      const res = generateAgentInstructions(tool, targetRoot);
      if (res.ok) {
        if (res.skipped) {
          console.log(chalk.dim(`  [${tool.name}] ${res.path} already exists — not overwritten`));
        } else {
          console.log(chalk.green(`  [${tool.name}] ✓ Template created: ${res.path}`));
        }
      }
    }
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
