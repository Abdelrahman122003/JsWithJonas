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
     const filtered = arr.filter((element) => element > 2);
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
     const mapped = arr.map((element) => element * 2);
     ```

   - `reduce()`: Reduces the array to a single value by applying a function.

     ```js
     const total = arr.reduce((acc, element) => acc + element, 0);
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

   - `reverse()`: Reverses the array in place.
     ```js
     arr.reverse(); // Reverses the order of elements
     ```
