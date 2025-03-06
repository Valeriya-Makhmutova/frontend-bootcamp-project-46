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
  if (typeof value === 'boolean'
    || typeof value === 'number' || value === null) {
    return `${value}`;
  }
  return `'${value}'`;
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
      let newString;
      // это поможет сделать составной ключ:
      if (string === '') {
        newString = `${keyName}`;
      } else {
        newString = `${string}.${keyName}`;
      }

      if (flag === 'onlyIn1') {
        return `Property '${newString}' was removed`;
      }
      if (flag === 'onlyIn2') {
        return `Property '${newString}' was added with value: ${stringify(value)}`;
      }
      if (flag === 'bothDiff') {
        return `Property '${newString}' was updated. From ${stringify(value)} to ${stringify(newValue)}`;
      }
      if (flag === 'bothNested') {
        return iter(value, newString);
      }
      if (flag === 'bothEqual') {
        return [];
      }
      return 'The flag does not exist';
    });
    return [...result].join('\n');
  };
  return iter(object, '');
};

export default plain;
