## Looping Objects Keys, Values and Entries.

```js
  const OpenningHours = {
  [weekdays[3]]: {
      open: 12,
      close: 22,
  },
  weekdays[4]: {
      open: 11,
      close: 23,
  },
  weekdays[5]: {
      open: 0, // Open 24 hours
      close: 24,
  },
};
```

- Get Keys For Object

  ```js
  const properties = Object.keys(OpenningHours);

  console.log(properties);
  ```

- Get Values For Object

  ```js
  const values = object.values(OpenningHours);
  console.log(properties);
  ```

- Get Values and Keys For Object

  ```js
  const entries = object.entries(OpenningHours);
  ```

## Sets

Set is a collection of unique values, meaning it automatically removes duplicate values. Sets are useful when you want to store a list of values where each item must be distinct.

1. `new Set()`: Creates a new Set.

   ```js
   const mySet = new Set([1, 2, 3, 3, 4]);
   console.log(mySet); // Set(4) { 1, 2, 3, 4 }
   ```

2. `add(value)`: Adds a new element to the set.

   ```js
   mySet.add(5);
   console.log(mySet); // Set(5) { 1, 2, 3, 4, 5 }
   ```

3. `delete(value)`: Removes an element from the set.

   ```js
   mySet.delete(3);
   console.log(mySet); // Set(4) { 1, 2, 4, 5 }
   ```

4. `has(value)`: Checks if a value exists in the set.
   ```js
   console.log(mySet.has(2)); // true
   console.log(mySet.has(10)); // false
   ```

**Looping over Set**

```js
const testSet = new Set([1, 2, 3, 4, 5]);
testSet.forEach(function (value, _, map) {
  console.log(`the value is ${value}`);
});
```

## Maps

Map is a collection of key-value pairs where both keys and values can be of any type. Unlike objects, maps maintain the order of their entries and allow keys to be any data type (not just strings or symbols).

**Looping over Map**

```js
const testMap = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
  ["key4", "value4"],
  ["key5", "value5"],
]);

testMap.forEach(function (value, key, map) {
  console.log(`the key is ${key} and the value is ${value}`);
});
```
