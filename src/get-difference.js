import path from 'path';
import _ from 'lodash';
import parse from './parser.js';
import getFormattedDiff from './formatter.js';

function getDifference(file1, file2) {

  const extensionFile1 = path.extname(file1);
  const extensionFile2 = path.extname(file2);

  const file1Content = parse(extensionFile1, file1);
  const file2Content = parse(extensionFile2, file2);

  let result = [];

  // надо, чтобы функция возвращада объект, а форматер принимал объект и форматировал по параметрам 
  const iter = (file_1, file_2, depth) => {

    const keysFile1 = Object.keys(file_1); // положили все верхние ключи
    const keysFile2 = Object.keys(file_2);
    const unitedKeys = _.union(keysFile1, keysFile2); // объединение ключей массива

    // на первом шаге - [user, money, potatos]
    unitedKeys.forEach((key) => { // идем по ключам 
      // нам нужно возвращать 
      const obj = {};
      if (!_.isObject(file_1[key]) && !_.isObject(file_2[key])) {

        if (keysFile1.includes(key) && keysFile2.includes(key)) {
          obj.location = 'file_1&file_2';
          obj.depth = depth;
          obj.key = key;
          obj.value1 = file_1[key];
          obj.value2 = file_2[key];
          obj.type = 'key?value';
          result.push(obj);
        }

        if (keysFile1.includes(key) && !keysFile2.includes(key)) {
          obj.location = 'file_1';
          obj.depth = depth;
          obj.value = file_1[key];
          obj.key = key;
          obj.type = 'key&value';
          result.push(obj);
        }

        if (keysFile2.includes(key) && !keysFile1.includes(key)) {
          obj.location = 'file_2';
          obj.depth = depth;
          obj.value = file_2[key];
          obj.key = key;
          obj.type = 'key&value';
          result.push(obj);
        }

      }
      if (!keysFile1.includes(key) && _.isObject(file_2[key])) {
        obj.location = 'file_2';
        obj.depth = depth;
        obj.value = Object.entries(file_2[key]);
        obj.key = key;
        obj.type = 'object';
        result.push(obj);
      }
      if (!keysFile2.includes(key) && _.isObject(file_1[key])) {
        obj.location = 'file_1';
        obj.depth = depth;
        obj.value = Object.entries(file_1[key]);
        obj.key = key;
        obj.type = 'object';
        result.push(obj);
      }

      // console.log("keysFile1.includes(key)",keysFile1.includes(key))
      // console.log("keysFile2.includes(key)", keysFile2.includes(key))
      // console.log("_.isObject(file_1[key])",_.isObject(file_1[key]))
      // console.log("_.isObject(file2[key])",_.isObject(file2[key]))

      if (keysFile1.includes(key) && keysFile2.includes(key) && _.isObject(file_1[key]) && _.isObject(file_2[key])) {
        obj.location = 'file_1&file_2';
        obj.depth = depth;
        obj.key = key;
        obj.type = 'key';
        result.push(obj);
        iter(file_1[key], file_2[key], depth + 1);
      }
    }); 
    result = result.sort((a, b) => a.depth > b.depth ? 1 : -1);
    // return getFormattedDiff(result, file1Content, file2Content);
    // console.log(result);
    // return result;
    return getFormattedDiff(result);
  }
  return iter(file1Content, file2Content, 1);

};


export default getDifference;