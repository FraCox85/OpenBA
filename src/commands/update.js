import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { installSkill, readConfig, writeConfig, getPackageVersion, wipeTool } from '../lib/installer.js';
import enquirer from 'enquirer';

const { prompt } = enquirer;

export async function run(args) {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  openba update\n'));

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  // Retro-compatibilità: supporta sia vecchio config (singolo tool) che nuovo (array tools)
  const toolIds = config.tools || (config.tool ? [config.tool] : []);
  if (toolIds.length === 0) {
    console.log(chalk.red('  ✗ No configured tools found. Run `openba setup` to configure.\n'));
    process.exit(1);
  }

  const selectedTools = toolIds.map(id => TOOLS[id]).filter(Boolean);
  if (selectedTools.length === 0) {
    console.log(chalk.red(`  ✗ Unknown tools in config: ${toolIds.join(', ')}`));
    console.log(chalk.dim('  Run `openba setup` to reconfigure.\n'));
    process.exit(1);
  }

  const currentVersion = getPackageVersion();
  console.log(chalk.dim(`  Tools:           ${selectedTools.map(t => t.name).join(', ')}`));
  console.log(chalk.dim(`  Skills:          ${config.skills.length}`));
  console.log(chalk.dim(`  Current version: ${currentVersion}\n`));

  // Rileva un'installazione OpenBA v1 (skill id che non esistono più nel registro v2)
  const knownSkillIds = new Set(SKILLS.map(s => s.id));
  const isLegacyInstall = config.skills.some(id => !knownSkillIds.has(id));

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

  let skillsToInstall = config.skills;
  let wipe;

  if (isLegacyInstall) {
    // Migrazione v1 → v2: gli id installati non esistono più. Niente da recuperare —
    // pulizia completa e reinstallazione dell'intero set di skill v2.
    console.log(chalk.yellow('  ⚠  This project has a v1 OpenBA install (skill names changed in v2).'));
    console.log(chalk.dim('     Wiping old skills/commands and installing the full v2 skill set.\n'));
    wipe = true;
    skillsToInstall = SKILLS.map(s => s.id);
  } else {
    const { wipeAnswer } = await prompt({
      type: 'confirm',
      name: 'wipeAnswer',
      message: 'Do you want to delete all existing OpenBA skills and commands before updating (ensures a clean state)?',
      initial: true
    });
    wipe = wipeAnswer;
  }

  if (wipe) {
    for (const tool of selectedTools) {
      wipeTool(tool, targetRoot);
    }
    console.log(chalk.dim('  Deleted old skill and command folders.'));
  }

  // Step 3 — Aggiorna i file delle skill nel progetto
  const skillSpinner = ora({ text: 'Updating skill files...', color: 'cyan' }).start();
  const resultsByTool = [];

  for (const tool of selectedTools) {
    const results = [];
    for (const skillId of skillsToInstall) {
      const result = installSkill(skillId, tool, targetRoot);
      results.push({ skillId, ...result });
      skillSpinner.text = `[${tool.name}] Updating ${skillId}...`;
    }
    resultsByTool.push({ tool, results });
  }

  skillSpinner.succeed('Skill files updated');

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

  // Aggiorna config con nuova versione e nuovo set di skill
  const newVersion = latestVersion || currentVersion;
  writeConfig(targetRoot, { ...config, version: newVersion, skills: allOkSkills });

  const totalOk = resultsByTool.reduce((sum, current) => sum + current.results.filter(r => r.ok).length, 0);
  const totalFailed = resultsByTool.reduce((sum, current) => sum + current.results.filter(r => !r.ok).length, 0);

  console.log('');
  if (totalFailed === 0) {
    console.log(chalk.bold(`  ✓ ${skillsToInstall.length} skills updated across ${selectedTools.length} tool(s) to v${newVersion}\n`));
  } else {
    console.log(chalk.bold(`  ${totalOk} updated, ${chalk.red(totalFailed + ' failed')}\n`));
    console.log(chalk.dim('  Run `openba validate` to check skill integrity.\n'));
  }
}
