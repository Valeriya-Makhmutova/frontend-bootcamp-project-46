import _ from 'lodash';

const getAroundRecursively = (object, depth) => {
    const spaceForOne = 4;
    const indentToLeft = 2;
    // console.log('object', object)
    const space = ' ';
    const defaultSpace = space.repeat(2);
    const result = [];

    const keys = _.sortBy(Object.keys(object));
// console.log('keys', keys)

    // const lengthOfKeys = keys.length;


    keys.forEach((key) => {
        // console.log('key in recursive', key);
        if (!_.isObject(object[key])) {
           result.push(`\n${space.repeat(depth * spaceForOne - indentToLeft)}${key}: ${object[key]}`);
        //    console.log('!!!key', key)
        //    result.push(`\n${defaultSpace}${space.repeat(depth * 2 + 2)}${key}: ${object[key]}`);
        }
        if (_.isObject(object[key])) {
            // console.log('depth', depth)
            result.push(`\n${space.repeat(depth * spaceForOne - indentToLeft)}${key}: {`);
            result.push(getAroundRecursively(object[key], depth + 1));

            result.push(`\n${space.repeat(depth * spaceForOne - indentToLeft)}}`)
        }
    });
    // console.log('result in recursive', result)
    return result;
};

export default getAroundRecursively;
