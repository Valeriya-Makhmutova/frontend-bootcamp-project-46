// import getDifference from '../src/index.js';
import { test, expect } from '@jest/globals';
import fs from 'fs';

import path from 'path';

import { prepareDataForGetDiff } from '../src/index.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

//тесты на формат по умолчанию - stylish с плоскими данными 

test('compare flat jsons stylish', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/flat-test-files/file1-test.json',
    '__fixtures__/flat-test-files/file2-test.json');
  const expected = readFile('result-flat.txt');
  expect(recieved).toEqual(expected);
});

test('compare flat yamls stylish', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/flat-test-files/file1-test.yaml',
     '__fixtures__/flat-test-files/file2-test.yaml');
  const expected = readFile('result-flat.txt');
  expect(recieved).toEqual(expected);
});

//тесты на формат по умолчанию - stylish с вложенными данными 

test('compare jsons stylish', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1.json',
    '__fixtures__/file2.json');
  const expected = readFile('result-stylish.txt');
  expect(recieved).toEqual(expected);
});

test('compare yamls stylish', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1.yaml',
     '__fixtures__/file2.yaml');
  const expected = readFile('result-stylish.txt');
  expect(recieved).toEqual(expected);
});

//тесты на формат - plain с вложенными данными 

test('compare jsons plain', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1.json',
     '__fixtures__/file2.json', 'plain');
  const expected = readFile('result-plain.txt');
  expect(recieved).toEqual(expected);
});

test('compare yamls plain', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1.yaml',
     '__fixtures__/file2.yaml', 'plain');
  const expected = readFile('result-plain.txt');
  expect(recieved).toEqual(expected);
});
