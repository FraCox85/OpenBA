import chalk from 'chalk';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { readConfig, getPackageVersion } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.yellow('\n  OpenBA is not set up in this project.'));
    console.log(chalk.dim('  Run `openba setup` to get started.\n'));
    process.exit(0);
  }

  const tool = TOOLS[config.tool];
  const currentVersion = getPackageVersion();

  console.log(chalk.bold('\n  OpenBA — Installed Skills\n'));
  console.log(chalk.dim(`  Tool:    ${tool?.name || config.tool}`));
  console.log(chalk.dim(`  Version: ${config.version || 'unknown'} (current: ${currentVersion})`));

  if (config.version && config.version !== currentVersion) {
    console.log(chalk.yellow(`  ⚠  Update available — run \`openba update\` to upgrade\n`));
  } else {
    console.log('');
  }

  // Raggruppa skill installate per gruppo
  const groups = {};
  for (const skillId of config.skills) {
    const skill = SKILLS.find(s => s.id === skillId);
    const group = skill?.group || 'other';
    if (!groups[group]) groups[group] = [];
    groups[group].push(skill || { id: skillId, description: '' });
  }

  for (const [groupId, skills] of Object.entries(groups)) {
    const groupLabel = {
      core: 'Core',
      epic: 'Epic',
      feature: 'Feature',
      pbi: 'PBI',
      other: 'Other'
    }[groupId] || groupId;

    console.log(chalk.bold(`  ${groupLabel}`));
    skills.forEach(s => {
      console.log(`    ${chalk.green('✓')} ${s.id.padEnd(28)} ${chalk.dim(s.description || '')}`);
    });
    console.log('');
  }

  // Skill disponibili ma non installate
  const notInstalled = SKILLS.filter(s => !config.skills.includes(s.id));
  if (notInstalled.length > 0) {
    console.log(chalk.dim('  Not installed:'));
    notInstalled.forEach(s => {
      console.log(chalk.dim(`    - ${s.id.padEnd(28)} ${s.description}`));
    });
    console.log(chalk.dim('\n  Use `openba add <skill-id>` to install individual skills.\n'));
  }
}
