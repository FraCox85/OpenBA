import chalk from 'chalk';
import { cwd } from 'process';
import { TOOLS, SKILLS, SKILL_GROUPS } from '../lib/tools.js';
import { readConfig, getPackageVersion } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.yellow('\n  OpenBA is not set up in this project.'));
    console.log(chalk.dim('  Run `openba setup` to get started.\n'));
    process.exit(0);
  }

  const toolIds = config.tools || (config.tool ? [config.tool] : []);
  const toolNames = toolIds.map(id => TOOLS[id]?.name || id).join(', ');
  const currentVersion = getPackageVersion();

  console.log(chalk.bold('\n  OpenBA — Installed Skills\n'));
  console.log(chalk.dim(`  Tools:   ${toolNames || 'unknown'}`));
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
    console.log(chalk.bold(`  ${SKILL_GROUPS[groupId] || groupId}`));
    skills.forEach(s => {
      console.log(`    ${chalk.green('✓')} ${s.id.padEnd(20)} ${chalk.dim(s.description || '')}`);
    });
    console.log('');
  }

  // Skill disponibili ma non installate
  const notInstalled = SKILLS.filter(s => !config.skills.includes(s.id));
  if (notInstalled.length > 0) {
    console.log(chalk.dim('  Not installed (run `openba update` to reinstall the full v2 skill set):'));
    notInstalled.forEach(s => {
      console.log(chalk.dim(`    - ${s.id.padEnd(20)} ${s.description}`));
    });
    console.log('');
  }
}
