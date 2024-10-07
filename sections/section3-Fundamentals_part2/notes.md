## Strict Mode

strict mode is a way to enforce stricter parsing and error handling in your code. When enabled, it helps catch common coding mistakes and unsafe actions.

To enable strict mode, add "use strict"; at the beginning of a script or function. It makes your code more secure and avoids some common pitfalls of JavaScript.

```js
"use strict"; // Enables strict mode to catch errors like undeclared variables

let passTest = true;
let license = false;

if (passTest) license = true; // Corrected variable name from "liense" to "license"
// Without using strict mode, you wouldn't know that your code contains an error.
if (license) console.log("I Can Drive now");
```

## Function Declaration and expression

- Function Declaration

  - A named function is defined using the function keyword.
  - It is hoisted to the top of the scope, meaning it can be called before its definition in the code.
  - Example:

    ```js
    const age1 = calcAge1(199);
    console.log(age1);
    function calcAge1(birthYear) {
      return 2037 - birthYear;
    }
    const age1 = calcAge1(199);
    console.log(age1);
    ```

- Function Expression

  - A function can be defined and stored in a variable.
  - It is not hoisted, meaning it can only be called after its definition in the code.
  - Example:

    ```js
    const calcAge2 = function (birthYear) {
      return 2037 - birthYear;
    };
    const age2 = calcAge2(1000);
    console.log(age2);
    ```

- Arrow Function

  ```js
  const calcAge1 = (birthYear) => 2037 - birthYear;

  const age3 = calcAge1(100);
  console.log("Age3 : ", age3);
  ```

  ```js
  const definePerson = (age, firstName) => {
    return `My name is ${firstName} and I'm ${age}`;
  };

  const introMyself = definePerson(21, "abdelrahman");

  console.log(introMyself);
  ```

##

- `Array Literal Notation ([])`:

  - Syntax: const arr = ["value1", "value2", "value3"];
  - Usage: The most common and preferred way to create arrays due to its simplicity and readability.
  - Advantages:
    - Clear and concise.
    - Easy to read and understand.
    - Directly defines the array with its elements.

- `Array Constructor`:

  - Syntax: const arr = new Array("value1", "value2");
  - Usage: Less common but useful in specific cases, like predefining array length.
  - Advantages:
    - Allows creating an array with a predefined length (e.g., new Array(5) creates an array with 5 empty slots).
    - Can handle single or multiple arguments to initialize the array.
    - Caution:
    - If you pass a single numeric argument, it creates an empty array of that length, which can be confusing.
    - Less readable and more prone to errors compared to array literals.

## JavaScript Objects

In JavaScript, an object is a collection of **properties**, where each property is defined as a key-value pair. An object can hold values (which are the properties) and functions (known as methods).

1. Properties in JavaScript Objects:
   Properties are values associated with a specific key within an object. They can be strings, numbers, arrays, or even other objects.

   ```js
   const person = {
     name: "John",
     age: 30,
     city: "New York",
   };
   ```

2. Accessing Properties:

   You can access properties of an object in two ways:

   - **Dot Notation**:

     ```js
     console.log(person.name); // Output: "John"
     console.log(person.age); // Output: 30
     ```

   - **Bracket Notation**:
     ```js
     console.log(person["city"]); // Output: "New York"
     ```

3. Methods in JavaScript Objects:
   A method is a function that is a property of an object. It performs actions using the properties of the object.

   Example of Object with a Method:

   ```js
   const car = {
     brand: "Toyota",
     model: "Corolla",
     year: 2019,

     getCarInfo: function () {
       return `Car: ${this.brand} ${this.model}, Year: ${this.year}`;
     },
   };
   ```

4. Accessing and Calling Methods:

   To call a method, use **dot notation** or **bracket notation**:

   ```js
   console.log(car.getCarInfo()); // Output: "Car: Toyota Corolla, Year: 2019"
   console.log(car["getCarInfo"]());
   ```
