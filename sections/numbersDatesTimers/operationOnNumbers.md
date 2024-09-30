## Conversion

```js
// Convert the string "34" to a number using the unary plus (+) operator.
console.log(+"34"); // Output: 34 (number)

// Convert the string "34" to a number using the Number() constructor.
console.log(Number("34")); // Output: 34 (number)
```

## Parsing

- `Number.parseInt()`

  ```js
  // Parse the string "344fr" to an integer, ignoring any non-numeric characters after the digits.
  console.log(Number.parseInt("344fr")); // Output: 344 (only the numeric part is parsed)

  // Since the string starts with non-numeric characters, parseInt() returns NaN.
  console.log(Number.parseInt("rere344fr")); // Output: NaN
  ```

- `Number.parseFloat()`

  ```js
  // Parse the string "34.34rer" to a floating-point number, ignoring non-numeric characters after the digits.
  console.log(Number.parseFloat("34.34rer")); // Output: 34.34

  // Since the string starts with non-numeric characters, parseFloat() returns NaN.
  console.log(Number.parseFloat("dfg34.34rer")); // Output: NaN
  ```

## Checking Numbers

- `Number.isNaN()`

  ```js
  // Check if the value 43 is NaN (Not-a-Number). Since it's a valid number, it returns false.
  console.log(Number.isNaN(43)); // Output: false

  // Check if the string "43" is NaN. It returns false because it's a valid number when coerced.
  console.log(Number.isNaN("43")); // Output: false
  ```

- `Number.isFinite()`

  ```js
  // Check if 43 is a finite number. It returns true because 43 is finite.
  console.log(Number.isFinite(43)); // Output: true
  ```

- `Number.isInteger()`

  ```js
  // Check if 43.0 is an integer. It returns true because 43.0 is considered an integer in JavaScript.
  console.log(Number.isInteger(43.0)); // Output: true

  // Check if 43 is an integer. It returns true because 43 is an integer.
  console.log(Number.isInteger(43)); // Output: true

  // Check if the string "43" is an integer. It returns false because "43" is a string, not a number.
  console.log(Number.isInteger("43")); // Output: false
  ```

## Math Functions

- `Math.random()`

  ```js
  // random numbers from zero to one
  console.log(Math.random());
  // random numbers(integer) from min to max
  const randomInt = (min, max) =>
    Math.trunc(Math.random() * (max - min + 1) + min);
  ```

- round method
  ````js
  // Math.round: Rounds a number to the nearest integer
  console.log(Math.round(3.5)); // Output: 4 (rounds up because 3.5 is halfway)
  console.log(Math.round(3.2)); // Output: 3 (rounds down because 3.2 is less than 3.5)```
  ````
- trunc method

  ````js
  // Math.trunc: Removes the fractional part, returning only the integer part
  console.log(Math.trunc(3.5)); // Output: 3 (simply truncates the decimal)```
  ````

- ceil method

  ```js
  // Math.ceil: Rounds a number up to the nearest integer
  console.log(Math.ceil(3.5)); // Output: 4 (always rounds up)
  console.log(Math.ceil(3.3)); // Output: 4 (rounds up, even though 3.3 is less than 3.5)
  ```

- floor method

  ```js
  // Math.floor: Rounds a number down to the nearest integer
  console.log(Math.floor(3.5)); // Output: 3 (always rounds down)
  console.log(Math.floor(3.3)); // Output: 3 (rounds down to 3)
  ```

- type Coercion with math functions

  ```js
  // Math.floor with a string: The string is coerced into a number before processing
  console.log(Math.floor("3.5")); // Output: 3 (the string "3.5" is converted to a number and floored)
  console.log(Math.floor("3.3")); // Output: 3 (similarly, the string "3.3" is converted and floored)
  ```

- toFixed() method

  The toFixed() method in JavaScript is used to format a number using fixed-point notation. It converts the number to a string and rounds it to a specified number of decimal places.

  **digits**: The number of digits to appear after the decimal point. This argument is optional, and if omitted, it defaults to 0.

  ```js
  let num = 3.45678;

  console.log(num.toFixed(2)); // Output: "3.46" (rounds to 2 decimal places)
  console.log(num.toFixed(0)); // Output: "3" (no decimal places, rounds to nearest integer)
  console.log(num.toFixed(4)); // Output: "3.4568" (rounds to 4 decimal places)
  ```

  In JavaScript, even though numbers are primitive types, they can temporarily act like objects. When you call num.toFixed(), JavaScript automatically wraps the primitive number in a Number object, allowing you to access methods like toFixed(). Once the method is executed, the object wrapper is discarded, and the number remains a primitive.

## Big Integer

- If you use a number larger than MAX_SAFE_INTEGER, precision issues can occur
- To handle numbers larger than this, JavaScript provides BigInt

- BigInt numbers are created by appending 'n' at the end of the number

- The Math class in JavaScript does not work with BigInt numbers. The Math methods are designed to work with regular Number types, and if you try to use Math methods with a BigInt, you'll get a TypeError.

```js
// Maximum safe integer in JavaScript
console.log(Number.MAX_SAFE_INTEGER); // Output: 9007199254740991
console.log(2 ** 53 - 1); // Output: 9007199254740991 (same as MAX_SAFE_INTEGER)

let bigNumber = 4348374893748937948739847938n; // BigInt for very large numbers

// Regular numbers are treated as Number (primitive type)
let regularNumber = 39843848397; // Standard JavaScript number

// Important: BigInt cannot be mixed with regular numbers directly in operations
// For example, you can't add a BigInt and a regular number without converting them properly

// Conver regular number to big integer number
console.log(bigNumber * BigInt(regularNumber));
```

```js
// Operation For Big Integer Numbers
console.log(20n > 20); // false
console.log(20n === 20); // false
console.log(20n == 20); // true
console.log(typeof 20n); // bigint
```
