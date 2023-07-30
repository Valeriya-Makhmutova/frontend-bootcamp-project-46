const _ = require('lodash');
const fs = require('fs');
const path = require('path')

function getDifference(file1, file2) {
    const file1Content = JSON.parse(fs.readFileSync(path.resolve(file1), 'utf8'));
    const file2Content = JSON.parse(fs.readFileSync(path.resolve(file2), 'utf8'));

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
    console.log(`{\n${result}}`);
    return `{\n${result}}`;
}
module.exports = getDifference;