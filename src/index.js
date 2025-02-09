import _ from 'lodash';

const getDifference = (obj1, obj2) => {
  const lines = [];
  const signs = ['-', '+', ' '];
  const [minus, plus, space] = signs;

  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);

  const unionKeys = _.union(keysOfObj1, keysOfObj2);
  const sortedKeys = _.sortBy(unionKeys);

  // for (const key of sortedKeys) {
  //   const isOnlyInFirst = Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key);
  //   const isOnlyInSecond = !Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key);
  //   const isBothTrue = Object.hasOwn(obj1, key)
  //   && Object.hasOwn(obj2, key)
  //   && obj1[key] === obj2[key];
  //   const isBothFalse = Object.hasOwn(obj1, key)
  //   && Object.hasOwn(obj2, key)
  //   && obj1[key] !== obj2[key];

  //   if (isOnlyInFirst) {
  //     lines.push(`  ${minus} ${key}: ${obj1[key]}`);
  //   }

  //   if (isOnlyInSecond) {
  //     lines.push(`  ${plus} ${key}: ${obj2[key]}`);
  //   }

  //   if (isBothTrue) {
  //     lines.push(`  ${space} ${key}: ${obj1[key]}`);
  //   }

  //   if (isBothFalse) {
  //     lines.push(`  ${minus} ${key}: ${obj1[key]}`);
  //     lines.push(`  ${plus} ${key}: ${obj2[key]}`);
  //   }
  // }

  sortedKeys.forEach((key) => {
    const isOnlyInFirst = Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key);
    const isOnlyInSecond = !Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key);
    const isBothTrue = Object.hasOwn(obj1, key)
    && Object.hasOwn(obj2, key)
    && obj1[key] === obj2[key];
    const isBothFalse = Object.hasOwn(obj1, key)
    && Object.hasOwn(obj2, key)
    && obj1[key] !== obj2[key];

    if (isOnlyInFirst) {
      lines.push(`  ${minus} ${key}: ${obj1[key]}`);
    }

    if (isOnlyInSecond) {
      lines.push(`  ${plus} ${key}: ${obj2[key]}`);
    }

    if (isBothTrue) {
      lines.push(`  ${space} ${key}: ${obj1[key]}`);
    }

    if (isBothFalse) {
      lines.push(`  ${minus} ${key}: ${obj1[key]}`);
      lines.push(`  ${plus} ${key}: ${obj2[key]}`);
    }
  });

  const result = ['{', ...lines, '}'].join('\n');

  return result;
};

export default getDifference;
// const stringify = (value, replacer = ' ', spacesCount = 1) => {
//   const iter = (currentValue, depth) => {
//     // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
//     if (!_.isObject(currentValue)) {
//       return `${currentValue}`;
//     }

//     const indentSize = depth * spacesCount;
//     const currentIndent = replacer.repeat(indentSize);
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);
//     const lines = Object
//       .entries(currentValue)
//       .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

//     return [
//       '{',
//       ...lines,
//       `${bracketIndent}}`,
//     ].join('\n');
//   };

//   return iter(value, 1);
// };

// export default stringify;
