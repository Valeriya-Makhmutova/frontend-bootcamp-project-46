#!/usr/bin/env node


import { program } from 'commander';
// const { Command } = require('commander');
// const program = new Command();
import getDifference from './get-difference.js';
// const getDifference = require('./get-difference.js');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format <type>', 'output format')


program.command('generateDifference')
  .description('Search differences and matches between two files and display it as string')
  .argument('<file1>')
  .argument('<file2>')
  .option('--first', 'display just the first substring')
  .action((file1, file2) => {
    console.log(getDifference(file1, file2));
  });
  

program.parse();



// {
//   - follow: false
//     host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 50
//   + timeout: 20
//   + verbose: true
// }

// {
//   "host": "hexlet.io",
//   "timeout": 50,
//   "proxy": "123.234.53.22",
//   "follow": false
// }
// {
//   "timeout": 20,
//   "verbose": true,
//   "host": "hexlet.io"
// }
