import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { cwd } from 'process';
import { TOOLS } from '../lib/tools.js';
import { installSkill, readConfig, writeConfig, getPackageVersion } from '../lib/installer.js';

export async function run(args) {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  openba update\n'));

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const tool = TOOLS[config.tool];
  if (!tool) {
    console.log(chalk.red(`  ✗ Unknown tool in config: ${config.tool}`));
    console.log(chalk.dim('  Run `openba setup` to reconfigure.\n'));
    process.exit(1);
  }

  const currentVersion = getPackageVersion();
  console.log(chalk.dim(`  Tool:            ${tool.name}`));
  console.log(chalk.dim(`  Skills:          ${config.skills.length}`));
  console.log(chalk.dim(`  Current version: ${currentVersion}\n`));

  // Step 1 — Controlla se c'è una versione npm più recente
  let latestVersion = null;
  const checkSpinner = ora({ text: 'Checking for updates...', color: 'cyan' }).start();

  try {
    const result = execSync('npm view @fracox85/openba version', {
      encoding: 'utf8',
      timeout: 8000,
      stdio: ['pipe', 'pipe', 'pipe']
    }).trim();
    latestVersion = result;
    checkSpinner.stop();
  } catch {
    checkSpinner.stop();
    console.log(chalk.dim('  (Could not check npm registry — skipping version check)\n'));
  }

  // Step 2 — Se c'è una versione più recente, aggiorna il package globale
  if (latestVersion && latestVersion !== currentVersion) {
    console.log(chalk.yellow(`  New version available: ${chalk.bold(latestVersion)} (installed: ${currentVersion})`));

    const installSpinner = ora({
      text: `Installing @fracox85/openba@${latestVersion} globally...`,
      color: 'cyan'
    }).start();

    try {
      execSync(`npm install -g @fracox85/openba@${latestVersion}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      installSpinner.succeed(`Package updated to v${latestVersion}`);
      console.log('');
    } catch (err) {
      installSpinner.fail('Package update failed');
      console.log(chalk.dim('  Try manually: npm install -g @fracox85/openba@latest'));
      console.log(chalk.dim('  Continuing with skill file update...\n'));
    }
  } else if (latestVersion) {
    console.log(chalk.green(`  ✓ Package is up to date (v${currentVersion})\n`));
  }

  // Step 3 — Aggiorna i file delle skill nel progetto
  const skillSpinner = ora({ text: 'Updating skill files...', color: 'cyan' }).start();
  const results = [];

  for (const skillId of config.skills) {
    const result = installSkill(skillId, tool, targetRoot);
    results.push({ skillId, ...result });
    skillSpinner.text = `Updating ${skillId}...`;
  }

  skillSpinner.succeed('Skill files updated');

  const ok = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);

  console.log('');
  ok.forEach(r => console.log(chalk.green(`  ✓ ${r.skillId}`)));
  failed.forEach(r => console.log(chalk.red(`  ✗ ${r.skillId} — ${r.reason}`)));

  // Aggiorna config con nuova versione
  const newVersion = latestVersion || currentVersion;
  writeConfig(targetRoot, { ...config, version: newVersion });

  console.log('');
  if (failed.length === 0) {
    console.log(chalk.bold(`  ✓ ${ok.length} skills updated to v${newVersion}\n`));
  } else {
    console.log(chalk.bold(`  ${ok.length} updated, ${chalk.red(failed.length + ' failed')}\n`));
    console.log(chalk.dim('  Run `openba validate` to check skill integrity.\n'));
  }
}
