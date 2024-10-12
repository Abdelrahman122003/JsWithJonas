## Array Methods

1. Creation Methods

   - `Array()`: Constructor to create an array.

     ```js
     const arr = new Array(3); // Creates an array of 3 empty slots
     const arr2 = Array.of(1, 2, 3); // Creates an array with [1, 2, 3]
     ```

   - `Array.of()`: Creates a new array from a variable number of arguments.
     ```js
     const arr = Array.of(5); // Creates [5]
     ```
   - `Array.from()`: Creates a new array from an iterable object (like a string or NodeList).

     ```js
     const arr = Array.from("hello"); // Creates ['h', 'e', 'l', 'l', 'o']
     ```

     ```js
     const newA = Array.from({ length: 4 }, (curr, i) => i + 1);
     console.log(newA);

     // curr: The current element being processed (in this case, it will always be undefined since the array is initialized with an object of length).
     // i: The index of the current element.
     ```

2. Adding and Removing Elements

   - `push()`: Adds one or more elements to the end of an array.

     ```js
     arr.push(4); // Adds 4 to the end
     ```

   - `pop()`: Removes the last element from an array.

     ```js
     arr.pop(); // Removes the last element
     ```

   - `unshift()`: Adds one or more elements to the beginning of an array.

     ```js
     arr.unshift(0); // Adds 0 to the start
     ```

   - `shift()`: Removes the first element from an array.

     ```js
     arr.shift(); // Removes the first element
     ```

   - `splice()`: Adds or removes elements at a specific index.
     ```js
     arr.splice(2, 1); // Removes 1 element at index 2
     arr.splice(1, 0, "new"); // Inserts "new" at index 1
     ```

3. Accessing Elements

   - `at()`: Returns the element at the specified index.

     ```js
     arr.at(2); // Returns element at index 2
     ```

   - `slice()`: Returns a shallow copy of a portion of the array.

     ```js
     const sliced = arr.slice(1, 3); // Returns elements from index 1 to 2
     ```

   - `indexOf()`: Returns the first index of the specified element.

     ```js
     arr.indexOf("value"); // Returns the index of "value" or -1 if not found
     ```

   - `lastIndexOf()`: Returns the last index of the specified element.
     ```js
     arr.lastIndexOf("value"); // Returns the last index of "value"
     ```

4. Searching and Filtering

   - `find()`: Returns the first element that matches the condition.

     ```js
     arr.find((element) => element > 2); // Finds the first element > 2
     ```

   - `findIndex()`: Returns the index of the first element that matches the condition.

     ```js
     arr.findIndex((element) => element > 2); // Finds the index of the first element > 2
     ```

   - `filter()`: Returns a new array with elements that match the condition.

     ```js
     const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // Array of bank movements
     const depoists = movements.filter((mov) => mov > 0);
     console.log(depoists); // [ 200, 450, 3000, 70, 1300 ]
     const withdrawals = movements.filter((mov) => mov < 0);
     console.log(withdrawals); // [ -400, -650, -130 ]
     ```

   - `includes()`: Checks if an array contains a specific value.
     ```js
     arr.includes(2); // Returns true if 2 is in the array
     ```

5. Iteration Methods

   - `forEach()`: Executes a function for each array element.

     ```js
     arr.forEach((element) => console.log(element));
     ```

   - `map()`: Creates a new array by applying a function to every element.

     ```js
     const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // Array of bank movements
     const euroToUsd = 1.1; // Conversion rate from Euro to USD

     // Use the map method to create a new array of movements converted to USD
     // The map method iterates over each 'mov' (movement) in the 'movements' array
     // For each 'mov', it multiplies the value by the 'euroToUsd' conversion rate
     const newMovements = movements.map((mov) => mov * euroToUsd);

     console.log(newMovements); // Logs the new array with values converted to USD
     ```

   - `reduce()`: Reduces the array to a single value by applying a function.

   ```js
   const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // Array of bank movements
   const balance = movements.reduce((acc, curr, i, arr) => {
     return acc + curr;
   }, 0);
   ```

   - `reduceRight()`: Reduces the array to a single value from right to left.

     ```js
     const total = arr.reduceRight((acc, element) => acc + element, 0);
     ```

   - `some()`: Checks if at least one element passes a condition.

     ```js
     arr.some((element) => element > 3); // Returns true if any element > 3
     ```

   - `every()`: Checks if all elements pass a condition.
     ```js
     arr.every((element) => element > 3); // Returns true if all elements > 3
     ```

6. Sorting and Reversing

   - `sort()`: Sorts the array in place.

     ```js
     arr.sort(); // Sorts alphabetically or using a custom comparison
     ```

     ```js
     // Sort in ascending order using a callback function
     const numbers = [34, -34, 600, 12300, 4839, -347347, 400004];
     // If you want to place 'a' before 'b', return -1 if a < b
     // If you want to place 'b' before 'a', return 1 if b < a

     // First approach
     number.sort((a, b) => {
       if (a < b) return -1;
       else return 1;
     });
     // Second approach
     number.sort((a, b) => a - b);
     ```

   - `reverse()`: Reverses the array in place.
     ```js
     arr.reverse(); // Reverses the order of elements
     ```

## Looping over the array

```js
//            " -------- For Loop --------");
const arr = ["hassan", "hamed", "gamel", "bassem", "salam"];

for (const person of arr) {
  console.log(`the name is : ${person}`);
}
```

```js
//            " -------- For Loop With Entries --------");

// entries -> key(indes), value(value that is store in this inde)
for (const [i, v] of arr.entries()) {
  console.log(`${i + 1} -> ${v}`);
}
```

```js
//            " -------- For Each --------");

arr.forEach(function (person) {
  console.log(`Name is : ${person}`);
});
// 0: functoin("hassan")
// 1: functoin("hamed")
// 2: functoin("gamel")
// 3: functoin("bassem")
```

```js
//            " -------- For Each With Indcies --------");
arr.forEach(function (person, index, array) {
  console.log(`${index + 1} =>  ${person}`);
});
```

## flat method

The `flat()` method in JavaScript is used to flatten nested arrays into a single-level array. By default, it only flattens one level deep, but you can specify the depth to control how deep the array should be flattened.

```js
const arr = [1, 2, [3, 4, [5, 6]]];

// Default flattening (1 level deep)
console.log(arr.flat()); // Output: [1, 2, 3, 4, [5, 6]]

// Flattening 2 levels deep
console.log(arr.flat(2)); // Output: [1, 2, 3, 4, 5, 6]

// Flattening infinitely deep
console.log(arr.flat(Infinity)); // Output: [1, 2, 3, 4, 5, 6]
```
