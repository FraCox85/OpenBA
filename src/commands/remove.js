import chalk from 'chalk';
import { prompt } from 'enquirer';
import { cwd } from 'process';
import { TOOLS, CORE_SKILLS, SKILLS } from '../lib/tools.js';
import { removeSkill, readConfig, writeConfig } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('\n  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const tool = TOOLS[config.tool];

  let skillId = args[0];

  if (!skillId) {
    // Mostra solo skill installate e non core
    const removable = config.skills.filter(id => !CORE_SKILLS.includes(id));

    if (removable.length === 0) {
      console.log(chalk.yellow('\n  No removable skills installed (core skills cannot be removed).\n'));
      process.exit(0);
    }

    const { selected } = await prompt({
      type: 'select',
      name: 'selected',
      message: 'Which skill do you want to remove?',
      choices: removable.map(id => {
        const skill = SKILLS.find(s => s.id === id);
        return {
          name: id,
          message: `${id.padEnd(28)} ${chalk.dim(skill?.description || '')}`
        };
      })
    });
    skillId = selected;
  }

  // Blocca rimozione skill core
  if (CORE_SKILLS.includes(skillId)) {
    console.log(chalk.red(`\n  ✗ ${skillId} is a core skill and cannot be removed.\n`));
    process.exit(1);
  }

  if (!config.skills.includes(skillId)) {
    console.log(chalk.yellow(`\n  ⚠  ${skillId} is not installed.\n`));
    process.exit(0);
  }

  // Conferma
  const { confirm } = await prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Remove ${skillId}?`,
    initial: false
  });

  if (!confirm) {
    console.log(chalk.dim('\n  Cancelled.\n'));
    process.exit(0);
  }

  const result = removeSkill(skillId, tool, targetRoot);

  if (result.ok) {
    writeConfig(targetRoot, {
      ...config,
      skills: config.skills.filter(id => id !== skillId)
    });
    console.log(chalk.green(`\n  ✓ ${skillId} removed\n`));
  } else {
    console.log(chalk.yellow(`\n  ⚠  ${result.reason}\n`));
    // Rimuovi comunque dalla config anche se il file non era trovabile
    writeConfig(targetRoot, {
      ...config,
      skills: config.skills.filter(id => id !== skillId)
    });
  }
}
