install: 
	npm ci

genDiff: 
	clear && node ./src/commander-get-difference.js generateDifference ./__fixtures__/file1.json ./__fixtures__/file2.json

lint:
	npx eslint .

test:
	npm run test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run
