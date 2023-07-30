const getDifference = require('../src/get-difference');
const file1 = require('../src/file1.json');
const file2 = require('../src/file2.json');


test('type of function result', () => {
    expect(typeof getDifference(file1, file2)).toBe('string');
  });
