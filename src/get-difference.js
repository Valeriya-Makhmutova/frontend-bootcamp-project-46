import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

function getDifference(file1, file2) {

  const extensionFile1 = path.extname(file1);
  const extensionFile2 = path.extname(file2);

  let file1Content;
  let file2Content;

  if (extensionFile1 === '.json') {
    file1Content = JSON.parse(fs.readFileSync(path.resolve(file1), 'utf8'));
  }

  if (extensionFile2 === '.json') {
    file2Content = JSON.parse(fs.readFileSync(path.resolve(file2), 'utf8'));
  }

  if (extensionFile1 === '.yaml' || extensionFile1 === '.yml') {
    file1Content = yaml.load(fs.readFileSync(path.resolve(file1), 'utf8'));
  }

  if (extensionFile2 === '.yaml' || extensionFile2 === '.yml') {
    file2Content = yaml.load(fs.readFileSync(path.resolve(file2), 'utf8'));
  }
   
    // const pathOfFile1 = fs.readFileSync(path.resolve(file1), 'utf8');
    // const pathOfFile2 = fs.readFileSync(path.resolve(file2), 'utf8');
 
    // console.log(pathOfFile2)
    // console.log(pathOfFile1)
    
    
    // console.log(file1)
    // console.log(file2)

    // console.log(extensionFile1)
    // console.log(extensionFile2)

    // console.log(file1Content)
    // console.log(file2Content)

   
    
    // const file1Content = JSON.parse(fs.readFileSync(path.resolve(file1), 'utf8'));
    // const file2Content = JSON.parse(fs.readFileSync(path.resolve(file2), 'utf8'));
    
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
    
    // console.log("🚀 ~ file: get-difference.js:74 ~ getDifference ~ result:", result)
    return `{\n${result}}`;
}
export default getDifference;