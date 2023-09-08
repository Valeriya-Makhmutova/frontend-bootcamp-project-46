import path from 'path';
import _ from 'lodash';
import parse from './parser.js';

function getDifference(file1, file2) {

  const extensionFile1 = path.extname(file1);
  const extensionFile2 = path.extname(file2);

  const file1Content = parse(extensionFile1, file1);
  const file2Content = parse(extensionFile2, file2);

  let resultString = '\{\n';

  const iter = (file1, file2, depth) => {
    console.log("file1",file1)
    console.log("file2",file2)
    const keysFile1 = Object.keys(file1);
    const keysFile2 = Object.keys(file2);
    const unitedKeys = _.union(keysFile1, keysFile2);

    unitedKeys.forEach((key) => {
  
      const bothValueIsObject = _.isObject(file1[key]) || _.isObject(file2[key]);
      const bothValueNotObject = !_.isObject(file1[key]) && !_.isObject(file2[key]);

      const keyOnlyInFile1 = keysFile1.includes(key) && !keysFile2.includes(key);
      const keyOnlyInFile2 = !keysFile1.includes(key) && keysFile2.includes(key);
      // const hasSameKeys = keysFile1.includes(key) && keysFile2.includes(key);
      // const valuesEqual = hasSameKeys && file1[key] === file2[key];
      // const valuesDiferent = hasSameKeys && file1[key] !== file2[key];
      
      if (bothValueNotObject) {

          resultString += `${key}: ${file1[key]}\n`;

        // if (keyOnlyInFile1) {
        //   resultString += ` - ${key}: ${file1[key]}\n`;
        // }
        // if (valuesEqual) {
        //   resultString += `   ${key}: ${file1[key]}\n`;
        // }
        // if (valuesDiferent) {
        //   resultString += ` - ${key}: ${file1[key]}\n + ${key}: ${file2[key]}\n`;
        // }
        // if (keyOnlyInFile2) {
        //   resultString += ` + ${key}: ${file2[key]}\n`;
        // }
        // return resultString;
      }
      
      if (bothValueIsObject) {
        if (file1[key] === file2[key]) {
          resultString +=  `${key}: \n${iter(file1[key], file2[key], depth + 1)}`;
        } else {
          if (keyOnlyInFile1) {
            resultString +=  ` - ${file1[key]}: \n${iter(file1[key], file2[key], depth + 1)}`;
          }
          if (keyOnlyInFile2) {
            resultString +=  ` + ${file2[key]}: \n${iter(file1[key], file2[key], depth + 1)}`;
          }
        }
      }

    });
    
    return resultString;
  }

  return iter(file1Content, file2Content, 0) + '\}';
};


export default getDifference;