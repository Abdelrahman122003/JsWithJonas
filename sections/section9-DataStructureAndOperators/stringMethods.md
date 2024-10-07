## String Methods in JavaScript

JavaScript provides a wide range of methods to manipulate and work with strings. Below are some of the most commonly used string methods:

1. `charAt()`

   This method returns the character at a specified index in a string.

   ```js
   let str = "Hello, World!";
   console.log(str.charAt(1)); // "e"
   ```

2. `concat()`

   The `concat()` method is used to join two or more strings.

   ```js
   let str1 = "Hello";
   let str2 = "World";
   console.log(str1.concat(", ", str2)); // "Hello, World"
   ```

3. `includes()`

   The `includes()` method checks whether a string contains a specified substring.

   ```js
   let str = "Hello, World!";
   console.log(str.includes("World")); // true
   ```

4. `indexOf()`

   This method returns the index of the first occurrence of a specified substring. If not found, it returns -1.

   ```js
   let str = "Hello, World!";
   console.log(str.indexOf("World")); // 7
   ```

5. `slice()`

   The `slice()` method extracts a section of a string and returns it as a new string.

   ```js
   let str = "Hello, World!";
   console.log(str.slice(0, 5)); // "Hello"
   ```

6. `split()`

   This method splits a string into an array of substrings, based on a specified separator.

   ```js
   let str = "apple,banana,cherry";
   console.log(str.split(",")); // ["apple", "banana", "cherry"]
   ```

7. `substring()`

   The `substring()` method returns a substring between two indices.

   ```js
   let str = "Hello, World!";
   console.log(str.substring(0, 5)); // "Hello"
   ```

8. `toLowerCase()` / `toUpperCase()`

   These methods convert the entire string to lowercase or uppercase.

   ```js
   let str = "Hello, World!";
   console.log(str.toLowerCase()); // "hello, world!"
   console.log(str.toUpperCase()); // "HELLO, WORLD!"
   ```

9. `trim()`

   The `trim()` method removes whitespace from both ends of a string.

   ```js
   let str = "   Hello, World!   ";
   console.log(str.trim()); // "Hello, World!"
   ```

10. `replace()`

    This method searches for a specified value or regular expression and replaces it with a new value.

    ```js
    let str = "Hello, World!";
    console.log(str.replace("World", "JavaScript")); // "Hello, JavaScript!"
    ```
