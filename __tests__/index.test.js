import getDifference from "../src";

const example1 = {
  name: "Mary",
  age: 25,
  country: "Russia",
};

const example2 = {
  name: "Mary",
  age: 15,
  gender: "female"
};

const result_Test1 =
`{
  - age: 25
  + age: 15
  - country: Russia
  + gender: female
    name: Mary
}`;

test('getFlatDifference_Test1', () => {
  expect(getDifference(example1, example2)).toEqual(result_Test1);
});