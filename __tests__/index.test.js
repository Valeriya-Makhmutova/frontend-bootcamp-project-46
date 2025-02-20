// import getDifference from '../src/index.js';
import { test, expect } from '@jest/globals';
import fs from 'fs';

import path from 'path';

// import parse from '../src/parser.js';
// import { getFormat } from '../src/utils.js';
import { prepareDataForGetDiff } from '../src/index.js';


const getFixturePath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('compare flat jsons', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1-test.json','__fixtures__/file2-test.json');
  const expected = readFile('result-flat.txt');
  expect(recieved).toEqual(expected);
});

test('compare flat yamls', () => {
  const recieved = prepareDataForGetDiff('__fixtures__/file1-test.yaml', '__fixtures__/file2-test.yaml');
  const expected = readFile('result-flat.txt');
  expect(recieved).toEqual(expected);
});


// const example1Yaml = parse(readFile('file1-test.yaml'), getFormat('file1-test.yaml'));
// const example2Yaml = parse(readFile('file2-test.yaml'), getFormat('file2-test.yaml'));

// const example1Json = parse(readFile('file1-test.json'), getFormat('file1-test.json'));
// const example2Json = parse(readFile('file2-test.json'), getFormat('file2-test.json'));
