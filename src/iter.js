import _ from 'lodash';
// надо, чтобы функция возвращада объект, а форматер принимал объект и форматировал по параметрам 
let result = [];

const iter = (file_1, file_2, depth) => {

  const keysFile1 = Object.keys(file_1); // положили все верхние ключи
  const keysFile2 = Object.keys(file_2);
  const unitedKeys = _.sortBy(_.union(keysFile1, keysFile2)); // объединение ключей массива

  // на первом шаге - [user, money, potatos]
  // console.log('unitedkeys', unitedKeys)
  unitedKeys.forEach((key) => { // идем по ключам 
    // нам нужно возвращать 
    const arrayLength = unitedKeys.length;
    let obj = {};
    if (!_.isObject(file_1[key]) && !_.isObject(file_2[key])) {

      if (keysFile1.includes(key) && keysFile2.includes(key)) {
        obj.location = 'file_1&file_2';
        obj.depth = depth;
        obj.key = key;
        obj.value1 = file_1[key];
        obj.value2 = file_2[key];
        obj.type = 'key?value';

        if (unitedKeys.indexOf(key) === arrayLength - 1) {
          obj.lastElement = 'last';
        }

        result.push(obj);
      }

      if (keysFile1.includes(key) && !keysFile2.includes(key)) {
        obj.location = 'file_1';
        obj.depth = depth;
        obj.value = file_1[key];
        obj.key = key;
        obj.type = 'key&value';

        if (unitedKeys.indexOf(key) === arrayLength - 1) {
          obj.lastElement = 'last';
        }

        result.push(obj);
      }

      if (keysFile2.includes(key) && !keysFile1.includes(key)) {
        obj.location = 'file_2';
        obj.depth = depth;
        obj.value = file_2[key];
        obj.key = key;
        obj.type = 'key&value';

        if (unitedKeys.indexOf(key) === arrayLength - 1) {
          obj.lastElement = 'last';
        }

        result.push(obj);
      }

    }

   

    if (!keysFile1.includes(key) && _.isObject(file_2[key])) {
      obj.location = 'file_2';
      obj.depth = depth;
      obj.key = key;
      obj.value = file_2[key];
      obj.type = 'object';

        obj.lastElement = 'last';

      result.push(obj);
    }

    if (!keysFile2.includes(key) && _.isObject(file_1[key])) {
      obj.location = 'file_1';
      obj.depth = depth;
      obj.key = key;
      obj.value = file_1[key];
      obj.type = 'object';

        obj.lastElement = 'last';
      

      result.push(obj);
       
    }

    if (keysFile2.includes(key) && keysFile1.includes(key) && _.isObject(file_1[key]) && !_.isObject(file_2[key])) {
      obj.location = 'file_1';
      obj.depth = depth;
      obj.key = key;
      obj.value = file_1[key];
      obj.type = 'object';

      if (unitedKeys.indexOf(key) === arrayLength - 1) {
        obj.lastElement = 'last';
      }

      result.push(obj);
      
      obj = {};

      obj.location = 'file_2';
      obj.depth = depth;
      obj.value = file_2[key];
      obj.key = key;
      obj.type = 'key&value';

      if (unitedKeys.indexOf(key) === arrayLength - 1) {
        obj.lastElement = 'last';
      }

      result.push(obj);
    }


    // if (keysFile2.includes(key) && keysFile1.includes(key) && _.isObject(file_1[key]) && !_.isObject(file_2[key])) {
    //   obj.location = 'file_2';
    //   obj.depth = depth;
    //   obj.value = file_2[key];
    //   obj.key = key;
    //   obj.type = 'key&value';
    //   result.push(obj);
    // }

    // console.log("keysFile1.includes(key)",keysFile1.includes(key))
    // console.log("keysFile2.includes(key)", keysFile2.includes(key))
    // console.log("_.isObject(file_1[key])",_.isObject(file_1[key]))
    // console.log("_.isObject(file2[key])",_.isObject(file2[key]))

    if (keysFile1.includes(key) && keysFile2.includes(key) && _.isObject(file_1[key]) && _.isObject(file_2[key])) {
      
      iter(file_1[key], file_2[key], depth + 1);
    }
  });
  // result = result.sort((a, b) => a.depth > b.depth ? 1 : -1);
  // return getFormattedDiff(result, file1Content, file2Content);
  // console.log(result);
  // return result;
  // console.log('result', result)
  return result;
}

export default iter;



// if (keysFile1.includes(key) && keysFile2.includes(key) && _.isObject(file_1[key]) && _.isObject(file_2[key])) {
//   obj.location = 'file_1&file_2';
//   obj.depth = depth;
//   obj.key = key;
//   obj.type = 'key';

//   if (unitedKeys.indexOf(key) === arrayLength - 1) {
//     obj.lastElement = 'last';
//   }

//   result.push(obj);

//   iter(file_1[key], file_2[key], depth + 1);


// }