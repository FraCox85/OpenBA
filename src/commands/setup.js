import chalk from 'chalk';
import enquirer from 'enquirer';
const { prompt } = enquirer;
import ora from 'ora';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { installSkill, installTeam, writeConfig, readConfig, getPackageVersion } from '../lib/installer.js';

export async function run() {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  OpenBA — Product Engineering Agent System'));
  console.log(chalk.dim('  BA-first discovery · brownfield impact · map/reconcile · verified delivery\n'));

  const existing = readConfig(targetRoot);
  if (existing) {
    const toolList = (existing.tools ?? [existing.tool]).filter(Boolean).join(', ');
    console.log(chalk.yellow('  ⚠  OpenBA is already set up in this project.'));
    console.log(chalk.dim(`     Tools: ${toolList}\n`));
    const { proceed } = await prompt({
      type: 'confirm',
      name: 'proceed',
      message: 'Run setup again? This adds/refreshes OpenBA-managed assets without deleting unrelated skills.',
      initial: false
    });
    if (!proceed) {
      console.log(chalk.dim('\n  Use `openba update` to refresh OpenBA assets.\n'));
      process.exit(0);
    }
  }

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

  if (!toolIds?.length) {
    console.log(chalk.red('\n  ✗ No tools selected. Aborting.\n'));
    process.exit(1);
  }

  const selectedTools = toolIds.map(id => TOOLS[id]);
  const selectedSkillIds = SKILLS.map(s => s.id);
  const spinner = ora({ text: 'Installing OpenBA assets...', color: 'cyan' }).start();
  const resultsByTool = [];

  for (const tool of selectedTools) {
    const results = [];
    for (const skillId of selectedSkillIds) {
      spinner.text = `[${tool.name}] Installing ${skillId}...`;
      results.push({ skillId, ...installSkill(skillId, tool, targetRoot) });
    }
    const teamResults = installTeam(tool, targetRoot);
    resultsByTool.push({ tool, results, teamResults });
  }

  spinner.succeed('OpenBA assets installed');

  for (const { tool, results, teamResults } of resultsByTool) {
    console.log(chalk.bold(`\n  ${tool.name}:`));
    results.forEach(r => console.log(r.ok ? chalk.green(`    ✓ ${r.skillId}`) : chalk.red(`    ✗ ${r.skillId} — ${r.reason}`)));
    const installedTeam = teamResults.filter(r => r.ok);
    if (installedTeam.length) console.log(chalk.dim(`    + ${installedTeam.length} team/governance assets`));
  }

  const allOkSkills = [...new Set(resultsByTool.flatMap(({ results }) => results.filter(r => r.ok).map(r => r.skillId)))];
  writeConfig(targetRoot, {
    version: getPackageVersion(),
    tools: toolIds,
    skills: allOkSkills,
    installedAt: existing?.installedAt ?? new Date().toISOString()
  });

  console.log(chalk.bold('\n  Setup complete.\n'));
  console.log('  Start here:');
  console.log(chalk.cyan('  1.') + ' Run `oba-map-project init` to build project knowledge');
  console.log(chalk.cyan('  2.') + ' Then use `oba <what you want to change>` for normal product work');
  console.log(chalk.cyan('  3.') + ' Use `oba-backlog` for ideas / NOW-NEXT-WAITING-LATER');
  console.log(chalk.cyan('  4.') + ' Use `oba-resume continue` when you come back later\n');
  console.log(chalk.dim('  The BA will always reflect back “What I understood” before promoting product work.\n'));
}