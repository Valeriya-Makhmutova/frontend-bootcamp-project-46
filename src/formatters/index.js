import stylish from './stylish.js';
import plain from './plain.js';

const activateFormat = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  }
  if (format === 'plain') {
    return plain(data);
  }
  if (format === 'json') {
    return JSON.stringify(data);
  }
  throw new Error(`Format '${format}' is not supported.
You can choose only formats 'stylish', 'plain', or 'json'.
Or you can leave it empty - format will be 'stylish'.`);
//   return `Format '${format}' is not supported.
// You can choose only formats 'stylish', 'plain', or 'json'.
// Or you can leave it empty - format will be 'stylish'.`;
};

export default activateFormat;
