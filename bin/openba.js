#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  console.log(pkg.version);
  process.exit(0);
}

switch (command) {
  case 'setup':
    (await import('../src/commands/setup.js')).run(args.slice(1));
    break;
  case 'update':
    (await import('../src/commands/update.js')).run(args.slice(1));
    break;
  case 'list':
    (await import('../src/commands/list.js')).run(args.slice(1));
    break;
  case 'add':
    (await import('../src/commands/add.js')).run(args.slice(1));
    break;
  case 'remove':
    (await import('../src/commands/remove.js')).run(args.slice(1));
    break;
  case 'validate':
    (await import('../src/commands/validate.js')).run(args.slice(1));
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}

function printHelp() {
  console.log(`
OpenBA v${pkg.version} — Product Engineering Agent System

Usage:
  openba setup     Install OBA capabilities for your AI coding tools
  openba update    Update OpenBA-managed skills/team assets safely
  openba validate  Verify installed skills and specialist assets
  openba list      Show installed capabilities
  openba add       Add an optional capability
  openba remove    Remove an installed non-core capability

Runtime capabilities after setup include:
  oba              Main product workflow
  oba-discover     Adaptive BA elicitation
  oba-impact       Brownfield blast-radius analysis
  oba-map-project  Project map / diff / reconcile
  oba-backlog      NOW / NEXT / WAITING / LATER backlog
  oba-resume       Resume persistent state

Options:
  -v, --version    Show version
  -h, --help       Show help

Docs: https://github.com/FraCox85/OpenBA
`);
}
