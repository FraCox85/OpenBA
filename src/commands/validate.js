import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { TOOLS, AGENTS, SUPPORT_FILES } from '../lib/tools.js';
import { readConfig } from '../lib/installer.js';

export async function run() {
  const targetRoot = cwd();
  console.log(chalk.bold('\n  openba validate\n'));

  const config = readConfig(targetRoot);
  if (!config) {
    console.log(chalk.red('  ✗ OpenBA is not set up. Run `openba setup` first.\n'));
    process.exit(1);
  }

  const toolIds = config.tools || (config.tool ? [config.tool] : []);
  const selectedTools = toolIds.map(id => TOOLS[id]).filter(Boolean);
  if (!selectedTools.length) {
    console.log(chalk.red('  ✗ No configured tools found.\n'));
    process.exit(1);
  }

  let anyFailed = false;

  for (const tool of selectedTools) {
    console.log(chalk.bold(`  ${tool.name}:`));
    const results = [];

    for (const skillId of config.skills || []) {
      const issues = [];
      if (!tool.skillsPath) {
        issues.push('Tool has no skillsPath defined');
      } else {
        const skillPath = join(targetRoot, tool.skillsPath, skillId, 'SKILL.md');
        if (!existsSync(skillPath)) {
          issues.push('SKILL.md not found');
        } else {
          const content = readFileSync(skillPath, 'utf8');
          if (!content.startsWith('---')) issues.push('Missing YAML frontmatter');
          const frontmatterEnd = content.indexOf('---', 3);
          if (frontmatterEnd === -1) {
            issues.push('Malformed YAML frontmatter');
          } else {
            const frontmatter = content.slice(3, frontmatterEnd);
            if (!frontmatter.includes('name:')) issues.push('Frontmatter missing name');
            if (!frontmatter.includes('description:')) issues.push('Frontmatter missing description');
          }
          if (content.trim().length < 120) issues.push('Skill content looks unexpectedly empty');
        }
      }
      results.push({ asset: skillId, ok: issues.length === 0, issues });
    }

    if (tool.agentsPath) {
      for (const agentId of AGENTS) {
        const path = join(targetRoot, tool.agentsPath, `${agentId}.md`);
        results.push({ asset: `agent:${agentId}`, ok: existsSync(path), issues: existsSync(path) ? [] : ['Agent file not found'] });
      }
    }

    for (const file of SUPPORT_FILES) {
      const base = file.kind === 'rule' ? tool.rulesPath : tool.supportPath;
      if (!base) continue;
      const path = join(targetRoot, base, file.target);
      results.push({ asset: `support:${file.target}`, ok: existsSync(path), issues: existsSync(path) ? [] : ['Support file not found'] });
    }

    const passed = results.filter(r => r.ok);
    const failed = results.filter(r => !r.ok);
    passed.forEach(r => console.log(chalk.green(`    ✓ ${r.asset}`)));
    failed.forEach(r => {
      console.log(chalk.red(`    ✗ ${r.asset}`));
      r.issues.forEach(issue => console.log(chalk.dim(`      · ${issue}`)));
    });
    console.log(chalk.dim(`    ${passed.length} passed, ${failed.length} failed\n`));
    if (failed.length) anyFailed = true;
  }

  console.log(anyFailed ? chalk.dim('  Run `openba update` to repair managed assets.\n') : chalk.green('  ✓ OpenBA installation valid\n'));
  process.exit(anyFailed ? 1 : 0);
}