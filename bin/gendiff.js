#!/usr/bin/env node

import { Command } from 'commander';
import prepareDataForGetDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to the first file to compare')
  .argument('<filepath2>', 'path to the second file to compare')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(prepareDataForGetDiff(filepath1, filepath2, program.opts().format));
  });
program.parse();
