import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { TOOLS, SKILLS } from '../lib/tools.js';
import { readConfig } from '../lib/installer.js';

// Sezioni obbligatorie per ogni skill
const REQUIRED_SECTIONS = ['## Role', '## Mission'];

// Sezioni obbligatorie per skill specifiche
const SKILL_REQUIRED_SECTIONS = {
  'oba-create-epic':     ['## STARTUP SEQUENCE', '## CLARIFICATION LOOP', '## PRD CREATION', '## Status Block'],
  'oba-create-features': ['## STARTUP SEQUENCE', '## Status Block'],
  'oba-create-pbis':     ['## STARTUP SEQUENCE', '## Status Block'],
  'oba-review-pbi':      ['## PROCESS', '## Verdict Criteria', '## Status Block'],
  'oba-review-feature':  ['## PROCESS', '## Status Block'],
  'oba-review-epic':     ['## PROCESS', '## Status Block'],
  'oba-debate-pbi':      ['## STARTUP SEQUENCE', '## Exit Condition', '## Status Block'],
  'oba-bcm':             ['## BCM STRUCTURE', '## BCM FILE FORMAT', '## SUBCOMMANDS'],
  'oba-init':            ['## PROCESS', '## Status Block'],
  'oba-status':          ['## PROCESS', '## Status Block'],
};

export async function run(args) {
  const targetRoot = cwd();

  console.log(chalk.bold('\n  openba validate\n'));

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const tool = TOOLS[config.tool];
  const results = [];

  for (const skillId of config.skills) {
    const issues = [];

    // 1 — Verifica che il file esista
    let skillPath = null;
    if (tool.skillsPath) {
      skillPath = join(targetRoot, tool.skillsPath, skillId, 'SKILL.md');
      if (!existsSync(skillPath)) {
        results.push({ skillId, ok: false, issues: ['File not found — run `openba update` to reinstall'] });
        continue;
      }
    } else if (tool.agentsFile) {
      // Per AGENTS.md verifica che il file esista e contenga il marker della skill
      const agentsPath = join(targetRoot, tool.agentsFile);
      if (!existsSync(agentsPath)) {
        results.push({ skillId, ok: false, issues: [`${tool.agentsFile} not found`] });
        continue;
      }
      const content = readFileSync(agentsPath, 'utf8');
      if (!content.includes(`<!-- OpenBA skill: ${skillId} -->`)) {
        issues.push(`Skill marker not found in ${tool.agentsFile} — run \`openba update\` to reinstall`);
      }
      results.push({ skillId, ok: issues.length === 0, issues });
      continue;
    }

    // 2 — Leggi il contenuto
    const content = readFileSync(skillPath, 'utf8');

    // 3 — Verifica frontmatter YAML
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
        if (!frontmatter.includes('tools:')) issues.push('Frontmatter missing field: tools');
      }
    }

    // 4 — Verifica sezioni obbligatorie globali
    for (const section of REQUIRED_SECTIONS) {
      if (!content.includes(section)) {
        issues.push(`Missing section: ${section}`);
      }
    }

    // 5 — Verifica sezioni specifiche per questa skill
    const specificSections = SKILL_REQUIRED_SECTIONS[skillId] || [];
    for (const section of specificSections) {
      if (!content.includes(section)) {
        issues.push(`Missing section: ${section}`);
      }
    }

    // 6 — Verifica Hard Rules (ogni skill deve averle)
    if (!content.includes('## Hard Rules')) {
      issues.push('Missing section: ## Hard Rules');
    }

    results.push({ skillId, ok: issues.length === 0, issues });
  }

  // Output
  const passed = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);

  if (failed.length === 0) {
    console.log(chalk.green(`  ✓ All ${passed.length} skills valid\n`));
    process.exit(0);
  }

  // Stampa risultati
  passed.forEach(r => {
    console.log(chalk.green(`  ✓ ${r.skillId}`));
  });

  if (passed.length > 0) console.log('');

  failed.forEach(r => {
    console.log(chalk.red(`  ✗ ${r.skillId}`));
    r.issues.forEach(issue => {
      console.log(chalk.dim(`    · ${issue}`));
    });
  });

  console.log('');
  console.log(chalk.bold(`  ${passed.length} passed, ${chalk.red(failed.length + ' failed')}`));
  console.log(chalk.dim('  Run `openba update` to reinstall corrupted skills.\n'));

  process.exit(failed.length > 0 ? 1 : 0);
}
