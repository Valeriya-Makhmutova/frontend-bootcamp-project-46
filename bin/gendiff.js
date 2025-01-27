#!/usr/bin/env node

import {Command} from 'commander';
const program = new Command();
import fs from 'fs';
import path from 'path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import getDifference from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.', )
  .version('0.0.1')
  .argument('filepath1', 'path to the first file to compare')
  .argument('filepath2', 'path to the second file to compare')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const getAbsolutePath = (filepath) => {
      return path.resolve(cwd(),filepath);
    }
    const data1 = fs.readFileSync(getAbsolutePath(filepath1));
    const data2 = fs.readFileSync(getAbsolutePath(filepath2));

    const parsedFirstFile = JSON.parse(data1);
    const parsedSecondFile = JSON.parse(data2);
    // console.log(JSON.parse(data1));
    // console.log(JSON.parse(data2));
    console.log(getDifference(parsedFirstFile, parsedSecondFile));
    
  })
  .parse(process.argv);

// program.parse();

// program.version('0.0.1', '-V, --version', 'output the current version');

