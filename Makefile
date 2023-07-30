genDiff: 
	node ./src/commander-get-difference.js generateDifference ./src/file1.json ./src/file2.json
lint:
	npx eslint .
test:
	npm run test