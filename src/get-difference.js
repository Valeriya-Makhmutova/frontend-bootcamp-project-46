import path from 'path';
import _ from 'lodash';
import parse from './parser.js';

function getDifference(file1, file2) {

  const extensionFile1 = path.extname(file1);
  const extensionFile2 = path.extname(file2);

  const file1Content = parse(extensionFile1, file1);
  const file2Content = parse(extensionFile2, file2);

  let result = '';
  const keysFile1 = Object.keys(file1Content); // помещаем ключи объекта file1 в массив keysFile1
  const keysFile2 = Object.keys(file2Content); // помещаем ключи объекта file2 в массив keysFile2
  const unitedKeys = _.sortBy(_.union(keysFile1, keysFile2)); // объединяем ключи в новый массив, без повторяющихся ключей
  // unitedKeys - [host, timeout, proxy, follow, verbose] и сортируем в алфавитном порядке
  unitedKeys.forEach((key) => {
    if (keysFile1.includes(key) && !keysFile2.includes(key)) {
      result += ` - ${key}: ${file1Content[key]}\n`;
    }
    if (keysFile1.includes(key) && keysFile2.includes(key) && file1Content[key] === file2Content[key]) {
      result += `   ${key}: ${file1Content[key]}\n`;
    }
    if (keysFile1.includes(key) && keysFile2.includes(key) && file1Content[key] !== file2Content[key]) {
      result += ` - ${key}: ${file1Content[key]}\n`;
      result += ` + ${key}: ${file2Content[key]}\n`;
    }
    if (!keysFile1.includes(key) && keysFile2.includes(key)) {
      result += ` + ${key}: ${file2Content[key]}\n`;
    }
  });

  return `{\n${result}}`;
}
export default getDifference;