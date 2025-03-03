import _ from 'lodash';

//onlyIn1 - такой ключ есть только в первом файле
//onlyIn2 - такой ключ есть только во втором файле
//bothEqual - одинаковый ключ и значения равны (не объект)
//bothDiff - ключ одинаковый, но значения разные
//bothNested - ключ одинаковый, значения оба объекты

const stringify = (value) => {
  if (_.isObject(value)) {
    return `[complex value]`;
  }
  if (typeof value === 'boolean' || value === null) {
    return `${value}`
  }
  return `'${value}'`;
};

export const plain = (object) => {
  
  const iter = (data, string) => {
    // console.log('data', data)
    // console.log('string', string)

    const result = data.flatMap((item) => {
      // console.log('item', item);
      const { keyName, flag, value, newValue } = item;

        // console.log('keyName', keyName);
      // console.log('flag', flag);
      // console.log('value', value);
      let newString;
      //это поможет сделать составной ключ:
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
    });
    // console.log('result', result)
    return [...result].join('\n');
  };
  return iter(object, '');
};

// const obj = [{
//   keyName: 'group1',
//   flag: 'bothNested',
//   value: [ [{a: 1}], [{a: 1}], [{a: 1}] ]
// }];

// plain(obj);