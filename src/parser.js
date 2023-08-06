import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';


export default function parser(extOfFile, file) {
    let result;
    if (extOfFile === '.json') {
      result = JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
    }
  
    if (extOfFile === '.yaml' || extOfFile === '.yml') {
      result = yaml.load(fs.readFileSync(path.resolve(file), 'utf8'));
    }
  
    return result;
  }