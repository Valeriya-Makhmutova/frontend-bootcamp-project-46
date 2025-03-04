import { stylish } from "./stylish.js";
import { plain } from './plain.js';

export const activateFormat = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  } else if (format === 'plain') {
    return plain(data);
  } else if (format === 'json') {
    return JSON.stringify(data);
  } else {
    return `Format '${format}' is not supported.
You can choose only formats 'stylish', 'plain', or 'json'.
Or you can leave it empty - format will be 'stylish'.`
  }
};
