import { stylish } from "./stylish.js";
import { plain } from './plain.js';

export const activateFormat = (data, format) => {
  if (format === 'stylish') {
    return stylish(data);
  } else if (format === 'plain') {
    return plain(data);
  } else {
    return `Format ${format} is not supported. 
    You can choose only formats 'stylish' or'plain'. 
    Or you can leave it empty - format will be 'stylish'.`
  }
};
