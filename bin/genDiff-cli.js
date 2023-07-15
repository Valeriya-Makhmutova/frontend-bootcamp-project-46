import file1 from './file1.json'; // при таком способе испорта данные парсятся автоматически, и нет необходимости использовать 
import file2 from './file2.json'; // JSON.parse(): . file1 и fail2 находятся в виде объектов
import generateDifference from '../src/gendiff';

generateDifference(file1, file2);
