#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
import _ from 'lodash';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')

  program.parse();

export default function generateDifference(file1, file2) {
  const keysFile1 = Object.keys(file1); // помещаем ключи объекта file1 в массив keysFile1
  const keysFile2 = Object.keys(file2); // помещаем ключи объекта file2 в массив keysFile2
  const unitedKeys = _.union(keysFile1, keysFile2); // объединяем ключи в новый массив, без повторяющихся ключей

}



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