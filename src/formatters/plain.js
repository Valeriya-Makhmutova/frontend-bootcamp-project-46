import _ from 'lodash';

// onlyIn1 - такой ключ есть только в первом файле
// onlyIn2 - такой ключ есть только во втором файле
// bothEqual - одинаковый ключ и значения равны (не объект)
// bothDiff - ключ одинаковый, но значения разные
// bothNested - ключ одинаковый, значения оба объекты

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (object) => {
  const iter = (data, string) => {
    const result = data.flatMap((item) => {
      const {
        keyName,
        flag,
        value,
        newValue,
      } = item;

      // это поможет сделать составной ключ:
      const newString = string === '' ? `${keyName}` : `${string}.${keyName}`;

      switch (flag) {
        case 'onlyIn1':
          return `Property '${newString}' was removed`;
        case 'onlyIn2':
          return `Property '${newString}' was added with value: ${stringify(value)}`;
        case 'bothDiff':
          return `Property '${newString}' was updated. From ${stringify(value)} to ${stringify(newValue)}`;
        case 'bothNested':
          return iter(value, newString);
        case 'bothEqual':
          return [];
        default:
          return 'The flag doesn\'t exist';
      }
    });
    return result.join('\n');
  };
  return iter(object, '');
};

export default plain;
