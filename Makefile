gendiff:
	node ./bin/gendiff.js
publish:
	npm publish --dry-run
make lint:
	eslint .
test:
	npm test