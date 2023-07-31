install: install-deps
	npx simple-git-hooks@2.9.0
run:
	bin/nodejs-package.js 10
install-deps:
	npm ci
genDiff: 
	node ./src/commander-get-difference.js generateDifference ./src/file1.json ./src/file2.json
lint:
	npx eslint .
test:
	npm run test