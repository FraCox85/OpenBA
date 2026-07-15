import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { TOOLS } from '../lib/tools.js';
import { readConfig } from '../lib/installer.js';

// Sezioni comuni a tutte le skill v2
const REQUIRED_SECTIONS = ['## Objective', '## Constraints'];

export async function run(args) {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  openba validate\n'));

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const toolIds = config.tools || (config.tool ? [config.tool] : []);
  const selectedTools = toolIds.map(id => TOOLS[id]).filter(Boolean);

  if (selectedTools.length === 0) {
    console.log(chalk.red('  ✗ No configured tools found. Run `openba setup` to configure.\n'));
    process.exit(1);
  }

  let anyFailed = false;

  for (const tool of selectedTools) {
    console.log(chalk.bold(`  ${tool.name}:`));
    const results = [];

    for (const skillId of config.skills) {
      const issues = [];

      if (!tool.skillsPath) {
        results.push({ skillId, ok: false, issues: ['Tool has no skillsPath defined'] });
        continue;
      }

      const skillPath = join(targetRoot, tool.skillsPath, skillId, 'SKILL.md');
      if (!existsSync(skillPath)) {
        results.push({ skillId, ok: false, issues: ['File not found — run `openba update` to reinstall'] });
        continue;
      }

      const content = readFileSync(skillPath, 'utf8');

      // Verifica frontmatter YAML
      if (!content.startsWith('---')) {
        issues.push('Missing YAML frontmatter');
      } else {
        const frontmatterEnd = content.indexOf('---', 3);
        if (frontmatterEnd === -1) {
          issues.push('Malformed YAML frontmatter — missing closing ---');
        } else {
          const frontmatter = content.slice(3, frontmatterEnd);
          if (!frontmatter.includes('name:')) issues.push('Frontmatter missing field: name');
          if (!frontmatter.includes('description:')) issues.push('Frontmatter missing field: description');
        }
      }

      // Verifica sezioni comuni a tutte le skill v2
      for (const section of REQUIRED_SECTIONS) {
        if (!content.includes(section)) {
          issues.push(`Missing section: ${section}`);
        }
      }

      results.push({ skillId, ok: issues.length === 0, issues });
    }

    const passed = results.filter(r => r.ok);
    const failed = results.filter(r => !r.ok);

    passed.forEach(r => console.log(chalk.green(`    ✓ ${r.skillId}`)));
    failed.forEach(r => {
      console.log(chalk.red(`    ✗ ${r.skillId}`));
      r.issues.forEach(issue => console.log(chalk.dim(`      · ${issue}`)));
    });

    console.log(chalk.dim(`    ${passed.length} passed, ${failed.length} failed`));
    console.log('');

    if (failed.length > 0) anyFailed = true;
  }

  if (anyFailed) {
    console.log(chalk.dim('  Run `openba update` to reinstall corrupted skills.\n'));
  } else {
    console.log(chalk.green('  ✓ All skills valid\n'));
  }

  process.exit(anyFailed ? 1 : 0);
}
