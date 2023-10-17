import path from 'path';

import parse from './parser.js';
import getFormattedDiff from './formatter.js';
import iter from './iter.js';

function getDifference(file1, file2) {

  const extensionFile1 = path.extname(file1);
  const extensionFile2 = path.extname(file2);

  const file1Content = parse(extensionFile1, file1);
  const file2Content = parse(extensionFile2, file2);

  const filesDifference = iter(file1Content, file2Content, 1);
  return getFormattedDiff(filesDifference);
};


export default getDifference;