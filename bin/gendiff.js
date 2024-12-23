#!/usr/bin/env node

import {Command} from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.', )
  .version('0.0.1')
  .argument('filepath1', 'path to the first file to compare')
  .argument('filepath2', 'path to the second file to compare')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

program.parse();

program.version('0.0.1', '-V, --version', 'output the current version');

