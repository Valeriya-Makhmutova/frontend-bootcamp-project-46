const getFormattedDiff = (data, file1, file2) => {
    let result = "{";
    const space = ' ';
    const defaultSpace = space.repeat(2);
    console.log(data)
    //   const keys = [];
    //   data.map((object) => {
    //     keys.push(object.key);
    //   })
    //мы получаем массив объектов
    //ключи: location, depth, value, key, type
    // type key - одинаковые ключи, значения которых объекты
    // type object - оригинальный ключ, значение которого объект
    // type key&value - оригинальный ключ, значение которых НЕ объект
    // type key?value - одинаковый ключ, без значений, их нужно сравнить и это НЕ объект

    data.forEach((obj) => {
        if (obj.depth === 1) {
            result += space.repeat(2 * obj.depth);
        
            if (obj.type === 'object' && obj.location === 'file_2') {
                // в obj.value в данном случае передается массив массивов, в каждом массиве массива ключ и значение: [[count, 0]]
                result += `\n${defaultSpace}- ${obj.key}: {\n${defaultSpace}${space.repeat(4 * obj.depth)}${obj.value[0][0]}: ${obj.value[0][1]}\n${defaultSpace}}`;
            }
            if (obj.type === 'object' && obj.location === 'file_1') {
                result += `\n${defaultSpace}+ ${obj.key}: {\n${defaultSpace}${space.repeat(4 * obj.depth)}${obj.value[0][0]}: ${obj.value[0][1]}\n${defaultSpace}}`;
            }
            
            if (obj.type === 'key') {
                result += `\n${defaultSpace}  ${obj.key}: {`;
            }
        }
        if (obj.depth > 1) {
          if (obj.type === 'key?value') {
            if (obj.value1 === obj.value2) {
                result += `\n${defaultSpace}${space.repeat((4 * obj.depth) - 3)}${obj.key}: ${obj.value1};`;
            } else {
                result += `\n${defaultSpace}${space.repeat(obj.depth)}+ ${obj.key}: ${obj.value2};`;
                result += `\n${defaultSpace}${space.repeat(obj.depth)}- ${obj.key}: ${obj.value1};`;
            }
          }
          
        }
    });
    return `${result}\n}`;
}

export default getFormattedDiff;

