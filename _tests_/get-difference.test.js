const getDifference = require('../src/get-difference');
const file2 = process.cwd() + '/src/file2.json';
const file1 = process.cwd() + '/src/file1.json';
console.log("🚀 ~ file: get-difference.test.js:5 ~ file1:", file1)

test('type of function result', () => {
    expect(typeof getDifference(file1, file2)).toBe('string');
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
    expect(getDifference(file1, file2)).toBe(result);
});