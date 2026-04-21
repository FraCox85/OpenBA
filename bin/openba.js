#!/usr/bin/env node

import { createRequire } from 'module';
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
OpenBA v${pkg.version} — Business Analyst-first spec framework

Usage:
  openba setup     Interactive setup wizard — select your AI tool and skills
  openba update    Check for new version and update installed skills
  openba validate  Verify installed skills are intact and well-formed
  openba list      Show installed skills and their versions
  openba add       Add a skill not selected during setup
  openba remove    Remove an installed skill

Options:
  -v, --version    Show version
  -h, --help       Show this help

Docs: https://github.com/FraCox85/OpenBA
`);
}
