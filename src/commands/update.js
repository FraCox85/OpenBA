import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { installSkill, installTeam, readConfig, writeConfig, getPackageVersion, wipeTool } from '../lib/installer.js';
import enquirer from 'enquirer';
const { prompt } = enquirer;

export async function run() {
  const targetRoot = cwd();
  console.log(chalk.bold('\n  openba update\n'));

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const toolIds = config.tools || (config.tool ? [config.tool] : []);
  const selectedTools = toolIds.map(id => TOOLS[id]).filter(Boolean);
  if (!selectedTools.length) {
    console.log(chalk.red('  ✗ No valid configured tools. Run `openba setup`.\n'));
    process.exit(1);
  }

  const currentVersion = getPackageVersion();
  let latestVersion = null;
  const check = ora({ text: 'Checking npm...', color: 'cyan' }).start();
  try {
    latestVersion = execSync('npm view @fracox85/openba version', { encoding: 'utf8', timeout: 8000, stdio: ['pipe', 'pipe', 'pipe'] }).trim();
    check.stop();
  } catch {
    check.stop();
    console.log(chalk.dim('  Could not check npm; updating from the installed package.'));
  }

  if (latestVersion && latestVersion !== currentVersion) {
    const install = ora({ text: `Installing @fracox85/openba@${latestVersion}...`, color: 'cyan' }).start();
    try {
      execSync(`npm install -g @fracox85/openba@${latestVersion}`, { stdio: ['pipe', 'pipe', 'pipe'] });
      install.succeed(`Package updated to ${latestVersion}`);
    } catch {
      install.fail('Global package update failed; continuing with current package assets');
    }
  }

  const oldManaged = config.skills || [];
  const newManaged = SKILLS.map(s => s.id);
  const { clean } = await prompt({
    type: 'confirm',
    name: 'clean',
    message: 'Remove old OpenBA-managed assets before reinstalling? (Unrelated tool skills are never touched.)',
    initial: true
  });

  if (clean) {
    for (const tool of selectedTools) wipeTool(tool, targetRoot, oldManaged);
  }

  const spinner = ora({ text: 'Updating OpenBA assets...', color: 'cyan' }).start();
  const resultsByTool = [];
  for (const tool of selectedTools) {
    const results = [];
    for (const skillId of newManaged) {
      spinner.text = `[${tool.name}] ${skillId}`;
      results.push({ skillId, ...installSkill(skillId, tool, targetRoot) });
    }
    const teamResults = installTeam(tool, targetRoot);
    resultsByTool.push({ tool, results, teamResults });
  }
  spinner.succeed('OpenBA assets updated');

  const allOkSkills = [...new Set(resultsByTool.flatMap(({ results }) => results.filter(r => r.ok).map(r => r.skillId)))];
  writeConfig(targetRoot, {
    ...config,
    version: latestVersion || currentVersion,
    tools: toolIds,
    skills: allOkSkills
  });

  for (const { tool, results, teamResults } of resultsByTool) {
    const failed = results.filter(r => !r.ok).length + teamResults.filter(r => !r.ok).length;
    console.log(failed ? chalk.yellow(`  ${tool.name}: updated with ${failed} warning(s)`) : chalk.green(`  ✓ ${tool.name}: updated`));
  }

  console.log(chalk.dim('\n  Run `openba validate` if you want an integrity check.\n'));
}