import yaml from 'js-yaml';

const parse = (data, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(data);
  } else if (fileFormat === 'yaml' || fileFormat === 'yml') {
    return yaml.load(data);
  } else {
    return `${fileFormat} is not supported. Please use only files of the format 'json' or 'yaml' ('yml)`;
  }
};

export default parse;