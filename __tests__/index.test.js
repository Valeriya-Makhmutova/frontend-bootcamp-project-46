// import getDifference from '../src/index.js';
import { test, expect } from '@jest/globals';
import fs from 'fs';

import path from 'path';

import prepareDataForGetDiff from '../src/index.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// тесты на формат по умолчанию - stylish с вложенными данными

test('compare jsons stylish', () => {
  const recieved = prepareDataForGetDiff(
    '__fixtures__/file1.json',
    '__fixtures__/file2.json',
  );
  const expected = readFile('result-stylish.txt');
  expect(recieved).toEqual(expected);
});

test('compare yamls stylish', () => {
  const recieved = prepareDataForGetDiff(
    '__fixtures__/file1.yml',
    '__fixtures__/file2.yml',
  );
  const expected = readFile('result-stylish.txt');
  expect(recieved).toEqual(expected);
});

// тесты на формат - plain с вложенными данными

test('compare jsons plain', () => {
  const recieved = prepareDataForGetDiff(
    '__fixtures__/file1.json',
    '__fixtures__/file2.json',
    'plain',
  );
  const expected = readFile('result-plain.txt');
  expect(recieved).toEqual(expected);
});

test('compare yamls plain', () => {
  const recieved = prepareDataForGetDiff(
    '__fixtures__/file1.yml',
    '__fixtures__/file2.yml',
    'plain',
  );
  const expected = readFile('result-plain.txt');
  expect(recieved).toEqual(expected);
});

// тесты на формат - json с вложенными данными

test('compare jsons files in jsons format', () => {
  const recieved = prepareDataForGetDiff(
    '__fixtures__/file1.json',
    '__fixtures__/file2.json',
    'json',
  );
  const expected = readFile('result-json.json');
  expect(recieved).toEqual(expected);
});

test('compare jsons yamls files in jsons format', () => {
  const recieved = prepareDataForGetDiff(
    '__fixtures__/file1.yml',
    '__fixtures__/file2.yml',
    'json',
  );
  const expected = readFile('result-json.json');
  expect(recieved).toEqual(expected);
});

