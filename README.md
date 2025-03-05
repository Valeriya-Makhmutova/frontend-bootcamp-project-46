## Difference calculator

### Hello! My name is Valeriya. Welcome to my training project "Difference calculator" :)

## Badges

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Valeriya-Makhmutova/frontend-bootcamp-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Valeriya-Makhmutova/frontend-bootcamp-project-46/actions)

### My tests and linter status:
[![Node CI](https://github.com/Valeriya-Makhmutova/frontend-bootcamp-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Valeriya-Makhmutova/frontend-bootcamp-project-46/actions/workflows/nodejs.yml)

### Code Climate Badge:
[![Maintainability](https://api.codeclimate.com/v1/badges/1fdbf3c9cb0e995fd3e1/maintainability)](https://codeclimate.com/github/Valeriya-Makhmutova/frontend-bootcamp-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/1fdbf3c9cb0e995fd3e1/test_coverage)](https://codeclimate.com/github/Valeriya-Makhmutova/frontend-bootcamp-project-46/test_coverage)

## About the project

The difference calculator helps to find the difference between two files. The project supports files of the 'json' and 'yaml' formats.

You can choose the format in which to output the differences between the files:

- stylized (stylish). In this format, the differences will be output as a line, with changes marked with + or -.

- simple (plain). In this format, the changes will be output as text - a set of sentences that will display the difference.

- in JSON format (json). In this format, the changes will be output as JSON data.

## How to install

#### Clone the repository to your computer:

```
git@github.com:Valeriya-Makhmutova/frontend-bootcamp-project-46.git
```

#### Run the commands:

```
make install
```
```
make publish
```
```
npm link
```
**May be needed a command 'sudo' before 'npm link'*

## How you can use difference calculator
Request help on how the program works
```
gendiff -h
```

You can compare 2 files with flat objects. If you do not specify the format, it will default to 'stylish'.
```
gendiff filename1 filename2
```
JSON format:
[![asciicast](https://asciinema.org/a/DyTHBH9zvoV4vP2NmdwwqMA9I.svg)](https://asciinema.org/a/DyTHBH9zvoV4vP2NmdwwqMA9I)

YAML format:
[![asciicast](https://asciinema.org/a/lLZThwYX2ONSk0633LYHVYdAn.svg)](https://asciinema.org/a/lLZThwYX2ONSk0633LYHVYdAn)

Example of comparing two files with nested objects.
```
gendiff --format stylish filename1 filename2
```
JSON format:
[![asciicast](https://asciinema.org/a/nrudGkmhSr2IIKiz596coNvZZ.svg)](https://asciinema.org/a/nrudGkmhSr2IIKiz596coNvZZ)

YAML format:
[![asciicast](https://asciinema.org/a/bAEXbYtOMknGxKWgdkYJDQws5.svg)](https://asciinema.org/a/bAEXbYtOMknGxKWgdkYJDQws5)

An example of the difference calculator working with output in text format - 'plain'.
```
gendiff --format plain filename1 filename2
```
JSON format:
[![asciicast](https://asciinema.org/a/hkyvisd8JSh3YC0bEHKs1HXHm.svg)](https://asciinema.org/a/hkyvisd8JSh3YC0bEHKs1HXHm)

YAML format:
[![asciicast](https://asciinema.org/a/lvmsyPReQJxTXa5Oe03xuNVsd.svg)](https://asciinema.org/a/lvmsyPReQJxTXa5Oe03xuNVsd)


Example of difference calculator with output in JSON format
```
gendiff --format json filename1 filename2
```
JSON format:
[![asciicast](https://asciinema.org/a/RC3lc56uCGyFv6cQftvTZDYZR.svg)](https://asciinema.org/a/RC3lc56uCGyFv6cQftvTZDYZR)

YAML format:
[![asciicast](https://asciinema.org/a/oqy9ybNH329NSQRk51kqhtV7Z.svg)](https://asciinema.org/a/oqy9ybNH329NSQRk51kqhtV7Z)
#### Also project has tests. You can launch them:
```
make test
```

## The end.

#### I would be glad to receive feedback on the project :)
#### My email for feedback: mavapa369@yandex.ru

#### Best regards, Valeriya