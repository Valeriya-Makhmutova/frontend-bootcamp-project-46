// import getDifference from '../src/index.js';
import { test, expect } from '@jest/globals';
import fs from 'fs';

import path from 'path';

import { prepareDataForGetDiff } from '../src/index.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compare flat jsons', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/plain-test-files/file1-test.json',
    '__fixtures__/plain-test-files/file2-test.json');
  const expected = readFile('result-flat.txt');
  expect(recieved).toEqual(expected);
});

test('compare flat yamls', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/plain-test-files/file1-test.yaml',
     '__fixtures__/plain-test-files/file2-test.yaml');
  const expected = readFile('result-flat.txt');
  expect(recieved).toEqual(expected);
});

test('compare jsons', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1.json',
    '__fixtures__/file2.json');
  const expected = readFile('result.txt');
  expect(recieved).toEqual(expected);
});

test('compare yamls', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1.yaml',
     '__fixtures__/file2.yaml');
  const expected = readFile('result.txt');
  expect(recieved).toEqual(expected);
});
