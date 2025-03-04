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
};

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

const stylish = (data) => {
  const iter = (element, depth) => {
    const result = element.map((item) => {
      const indentSize = depth * forKey;
      const keyIndent = indent.repeat(indentSize - forPrefix);
      const indentBeforeBracket = indent.repeat(indentSize);
      if (item.flag === 'onlyIn1' || item.flag === 'onlyIn2' || item.flag === 'bothEqual') {
        return `${keyIndent}${flagsAndSymbols[item.flag]} ${item.keyName}: ${stringify(item.value, depth + 1)}`;
      }

      if (item.flag === 'bothDiff') {
        return `${keyIndent}${flagsAndSymbols.onlyIn1} ${item.keyName}: ${stringify(item.value, depth + 1)}\n${keyIndent}${flagsAndSymbols.onlyIn2} ${item.keyName}: ${stringify(item.newValue, depth + 1)}`;
      }

      if (item.flag === 'bothNested') {
        return `${keyIndent}${flagsAndSymbols[item.flag]} ${item.keyName}: ${openBracket}\n${iter(item.value, depth + 1).join('\n')}\n${indentBeforeBracket}${closeBracket}`;
      }
      return 'The flag does not exist';
    });
    return result;
  };
  const resultCollection = [`${openBracket}`, ...iter(data, 1), `${closeBracket}`];
  const resultString = resultCollection.join('\n');
  return resultString;
};

export default stylish;
