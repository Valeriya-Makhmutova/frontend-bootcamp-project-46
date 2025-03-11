import _ from 'lodash';

// onlyIn1 - такой ключ есть только в первом файле
// onlyIn2 - такой ключ есть только во втором файле
// bothEqual - одинаковый ключ и значения равны (не объект)
// bothDiff - ключ одинаковый, но значения разные
// bothNested - ключ одинаковый, значения оба объекты

const forKey = 4;
const forPrefix = 2;
const indent = ' ';
const openBracket = '{';
const closeBracket = '}';
const flagsAndSymbols = {
  onlyIn1: '-',
  onlyIn2: '+',
  bothEqual: ' ',
  bothNested: ' ',
  bothDiff: ['-', '+'],
};
const first = 1;
const second = 2;

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentSize = depth * forKey;
  const keyIndent = indent.repeat(indentSize);
  const indentBeforeBracket = indent.repeat(indentSize - forKey);
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${keyIndent}${key}: ${stringify(value, depth + 1)}`);

  return [
    `${openBracket}`,
    ...lines,
    `${indentBeforeBracket}${closeBracket}`,
  ].join('\n');
};

const getKeyString = (keyIndent, flag, keyName, numberOfElem) => {
  if (numberOfElem === first) {
    return `${keyIndent}${flagsAndSymbols[flag][0]} ${keyName}:`;
  }
  if (numberOfElem === second) {
    return `${keyIndent}${flagsAndSymbols[flag][1]} ${keyName}:`;
  }
  return `${keyIndent}${flagsAndSymbols[flag]} ${keyName}:`;
};

const stylish = (data) => {
  const iter = (element, depth) => {
    const result = element.map((item) => {
      const indentSize = depth * forKey;
      const keyIndent = indent.repeat(indentSize - forPrefix);
      const indentBeforeBracket = indent.repeat(indentSize);

      const {
        keyName,
        flag,
        value,
        newValue,
      } = item;

      if (flag === 'onlyIn1' || flag === 'onlyIn2' || flag === 'bothEqual') {
        return `${getKeyString(keyIndent, flag, keyName)} ${stringify(value, depth + 1)}`;
      }

      if (item.flag === 'bothDiff') {
        return `${getKeyString(keyIndent, flag, keyName, 1)} ${stringify(value, depth + 1)}\n${getKeyString(keyIndent, flag, keyName, 2)} ${stringify(newValue, depth + 1)}`;
      }

      if (item.flag === 'bothNested') {
        return `${getKeyString(keyIndent, flag, keyName)} ${openBracket}\n${iter(value, depth + 1).join('\n')}\n${indentBeforeBracket}${closeBracket}`;
      }
      throw new Error('The flag doesn\'t exist');
    });
    return result;
  };
  return [`${openBracket}`, ...iter(data, 1), `${closeBracket}`].join('\n');
};

export default stylish;
