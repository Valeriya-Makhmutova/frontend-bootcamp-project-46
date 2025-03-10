import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import parse from './parser.js';

import getFormat from './utils.js';

import activateFormat from './formatters/index.js';

const getFixturePath = (fileName) => path.resolve(process.cwd(), fileName);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const giveDifferences = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);

  const unionKeys = _.union(keysOfObj1, keysOfObj2);
  const sortedKeys = _.sortBy(unionKeys);

  const resultCollection = sortedKeys.map((key) => {
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      return {
        keyName: key,
        flag: 'onlyIn1',
        value: obj1[key],
      };
    }

    if (Object.hasOwn(obj2, key) && !Object.hasOwn(obj1, key)) {
      return {
        keyName: key,
        flag: 'onlyIn2',
        value: obj2[key],
      };
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && obj1[key] !== null && obj2[key] !== null) {
      return {
        keyName: key,
        flag: 'bothNested',
        value: giveDifferences(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        keyName: key,
        flag: 'bothDiff',
        value: obj1[key],
        newValue: obj2[key],
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        keyName: key,
        flag: 'bothEqual',
        value: obj1[key],
      };
    }
    return 'Something is going wrong';
  });
  return resultCollection;
};

const prepareDataForGetDiff = (path1, path2, formatter = 'stylish') => {
  if (!path1.includes('.') || !path2.includes('.')) {
    return 'Error in file names';
  }
  const data1 = parse(readFile(path1), getFormat(path1));
  const data2 = parse(readFile(path2), getFormat(path2));

  const dataOfDifferences = giveDifferences(data1, data2);

  return activateFormat(dataOfDifferences, formatter);
};

export default prepareDataForGetDiff;
