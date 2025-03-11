// import getDifference from '../src/index.js';
import { test, expect } from '@jest/globals';
import fs from 'fs';

import path from 'path';

import prepareDataForGetDiff from '../src/index.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonFile1 = '__fixtures__/file1.json';
const jsonFile2 = '__fixtures__/file2.json';
const yamlFile1 = '__fixtures__/file1.yml';
const yamlFile2 = '__fixtures__/file2.yml';
const resultStylish = 'result-stylish.txt';
const resultPlain = 'result-plain.txt';
const resultJSON = 'result-json.json';
const stylish = 'stylish';
const plain = 'plain';
const json = 'json';

test.each([
  [jsonFile1, jsonFile2, stylish, resultStylish],
  [yamlFile1, yamlFile2, stylish, resultStylish],
  [jsonFile1, jsonFile2, plain, resultPlain],
  [yamlFile1, yamlFile2, plain, resultPlain],
  [jsonFile1, jsonFile2, json, resultJSON],
  [yamlFile1, yamlFile2, json, resultJSON],
])('gendiff(%s, %s, %s)', (a, b, c, expected) => {
  expect(prepareDataForGetDiff(a, b, c)).toBe(readFile(expected));
});
