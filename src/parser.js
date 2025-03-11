import yaml from 'js-yaml';

const parse = (data, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(data);
  }
  if (fileFormat === 'yaml' || fileFormat === 'yml') {
    return yaml.load(data);
  }
  throw new Error('Error in file names');
};

export default parse;
