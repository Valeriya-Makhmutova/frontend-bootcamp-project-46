import getDifference from '../src/get-difference';
import { test, expect } from '@jest/globals';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('type of function result json', () => {
    expect(typeof getDifference(getFixturePath("file1.json"), getFixturePath("file2.json"))).toBe('string');
});

const result = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('work of function with json', () => {
    expect(getDifference(getFixturePath("file1.json"), getFixturePath("file2.json"))).toBe(result);
});

test('type of function result yml', () => {
  expect(typeof getDifference(getFixturePath("file1.yml"), getFixturePath("file2.yml"))).toBe('string');
});

test('work of function with yml', () => {
  expect(getDifference(getFixturePath("file1.yml"), getFixturePath("file2.yml"))).toBe(result);
});