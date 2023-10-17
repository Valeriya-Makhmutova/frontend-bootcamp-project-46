import getAroundRecursively from './recursive.js';

const getFormattedDiff = (data) => {
    let result = ['{'];
    const space = ' ';
    const defaultSpace = ' '.repeat(2);
    // console.log('data',data)
    const spaceForOne = 4;
    const indentToLeft = 2;

    //мы получаем массив объектов
    //ключи: location, depth, value, key, type
    // type key - одинаковые ключи, значения которых объекты
    // type object - оригинальный ключ, значение которого объект
    // type key&value - оригинальный ключ, значение которых НЕ объект
    // type key?value - одинаковый ключ, с значениями, их нужно сравнить и это НЕ объект

    // type lastElement - если ключ существует, то нужна закрывающаяся скобка

    data.forEach((obj) => {

      if (obj.type === 'key') {
        result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}${defaultSpace}${obj.key}: {`);
        
      }

      if (obj.type === 'key?value') {
        if (obj.value1 === obj.value2) {
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}  ${obj.key}: ${obj.value1}`)

          if (obj.lastElement) {
            result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}}`)
          }
          // result.push(`\n${defaultSpace}${space.repeat(2 + obj.depth)}  ${obj.key}: ${obj.value1}`)
        }
        if (obj.value1 !== obj.value2) {
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}- ${obj.key}: ${obj.value1}`)
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}+ ${obj.key}: ${obj.value2}`)

          if (obj.lastElement) {
            result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}}`)
          }
        }
      }

      if (obj.type === 'key&value') {
        if (obj.location === 'file_1') {
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}- ${obj.key}: ${obj.value}`)

          if (obj.lastElement) {
            result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}}`)
          }
        }
        if (obj.location === 'file_2') {
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}+ ${obj.key}: ${obj.value}`)

          if (obj.lastElement) {
            result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}}`)
          }
        }
      }

      if (obj.type === 'object') {
        // в object мы передаем в значение целый объект, нам нужно поставить + или - перед ключом 
        // и вывести весь объект в виде строки
        if (obj.location === 'file_1') {
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}- ${obj.key}: {`);
          result.push(...getAroundRecursively(obj.value, obj.depth + 1));

          if (obj.lastElement) {
            result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}}`)
          }

        }
        if (obj.location === 'file_2') {
          result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}+ ${obj.key}: {`);
          result.push(...getAroundRecursively(obj.value, obj.depth + 1));

          if (obj.lastElement) {
            result.push(`\n${space.repeat(obj.depth * spaceForOne - indentToLeft)}}`)
          }
        }
      };
    });
    result.push(`\n}`)
    return result.join('');
};

export default getFormattedDiff;

