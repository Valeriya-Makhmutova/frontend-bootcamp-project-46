import getDifference from '../src/get-difference';
import { test, expect } from '@jest/globals';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('type of function result', () => {
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

test('work of function', () => {
    expect(getDifference(getFixturePath("file1.json"), getFixturePath("file2.json"))).toBe(result);
});