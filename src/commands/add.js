import chalk from 'chalk';
import { prompt } from 'enquirer';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { installSkill, readConfig, writeConfig } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('\n  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const tool = TOOLS[config.tool];

  // Se skill-id passato come argomento
  let skillId = args[0];

  if (!skillId) {
    // Mostra solo skill non ancora installate
    const available = SKILLS.filter(s => !config.skills.includes(s.id));

    if (available.length === 0) {
      console.log(chalk.green('\n  All available skills are already installed.\n'));
      process.exit(0);
    }

    const { selected } = await prompt({
      type: 'select',
      name: 'selected',
      message: 'Which skill do you want to add?',
      choices: available.map(s => ({
        name: s.id,
        message: `${s.id.padEnd(28)} ${chalk.dim(s.description)}`
      }))
    });
    skillId = selected;
  }

  // Valida
  const skill = SKILLS.find(s => s.id === skillId);
  if (!skill) {
    console.log(chalk.red(`\n  ✗ Unknown skill: ${skillId}`));
    console.log(chalk.dim('  Run `openba list` to see available skills.\n'));
    process.exit(1);
  }

  if (config.skills.includes(skillId)) {
    console.log(chalk.yellow(`\n  ⚠  ${skillId} is already installed.`));
    console.log(chalk.dim('  Run `openba update` to refresh it.\n'));
    process.exit(0);
  }

  const result = installSkill(skillId, tool, targetRoot);

  if (result.ok) {
    // Aggiorna config
    writeConfig(targetRoot, { ...config, skills: [...config.skills, skillId] });
    console.log(chalk.green(`\n  ✓ ${skillId} installed`));
    console.log(chalk.dim(`    Path: ${result.path}\n`));
  } else {
    console.log(chalk.red(`\n  ✗ Failed to install ${skillId}: ${result.reason}\n`));
    process.exit(1);
  }
}
