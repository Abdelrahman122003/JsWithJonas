## An High-Level Overview of JavaScript

- **`high-level`**

  Developer does NOT have to worry, everything happens automatically.

  **For Low-Level:** Developer has to manage resources manually like c language.

- **`Garbage-collected`**

  In JavaScript, garbage collection refers to the automatic process of freeing up memory that is no longer in use. JavaScript has a built-in `garbage collector` that automatically detects objects that are no longer reachable or referenced in the code and deallocates their memory, making it available for future use.

- **`interpreted or just-in-time compiled`**

  - **Interpreted**

    Interpreted: The code is executed line by line by the JavaScript engine without being compiled into machine code ahead of time. This was the traditional way JavaScript worked.

  - **Just-In-Time**

    Modern JavaScript engines (like V8 in Chrome) use a JIT compiler, which compiles JavaScript code into machine code just before it is executed. This improves performance by optimizing the code while it's running.

  The main idea behind Just-in-time (JIT) compilation is that it converts portions of the code into machine code (zeros and ones), which the computer's processor can execute directly. This doesn't happen in purely interpreted code, where the engine reads and executes the code line by line, without converting it to machine code beforehand.

- **`Multi-paradigm`**

  Multi-paradigm in JavaScript means that the language supports different programming styles or approaches. You can write code in multiple ways, depending on your needs:

  - **Procedural**: Writing code step by step, like instructions (e.g., using functions).

  - **Object-oriented**: Using objects and classes to model things in the real world (e.g., with constructors and prototypes).

  - **Functional**: Treating functions as first-class citizens, using concepts like higher-order functions and immutability.

- **`Prototype-based obejct-oriented`**

  A **prototype** in JavaScript is an object that other objects can use to inherit properties and methods. It acts like a template that allows objects to share common features without duplicating them.

  ```js
  // Prototype
  // Array for example
  Array.prototype.push
  Array.prototype.indexOf

  // Built from prototype and Our array inherits methods from prototype
  const arr = [1, 2, 3]
  arr.push(4);
  conat hasZero = arr.indexOf(0) > -1;
  ```

- **`First-class functions`**

  A first-class function is a feature in programming languages that allows functions to be assigned to variables, passed as arguments to other functions, and returned from other functions, treating them as first-class citizens

  ```js
  // Function assigned to a variable
  const greet = function (name) {
    return `Hello, ${name}!`;
  };

  // Function passed as an argument
  function processGreeting(greetingFunction, name) {
    return greetingFunction(name);
  }

  // Function returned from another function
  function createGreeter(greeting) {
    return function (name) {
      return `${greeting}, ${name}!`;
    };
  }
  // Using the functions
  console.log(processGreeting(greet, "Alice")); // Output: Hello, Alice!

  const welcomeGreeter = createGreeter("Welcome");
  console.log(welcomeGreeter("Bob")); // Output: Welcome, Bob!
  ```

  Languages that support first-class functions include:

  - JavaScript
  - Python
  - Ruby
  - Scala
  - Lisp

- **`Dynamic`**

  A dynamic type language like JavaScript means that variable types are determined at runtime rather than at compile time. This allows variables to hold values of any type and to change types during execution, providing flexibility but also leading to potential type-related errors.

  ```js
  let number = 10;
  console.log(typeof number); // number
  number = "10";
  console.log(typeof number); // string
  ```

- **`Single-threaded`**

  A single-threaded language is one in which only one sequence of instructions is executed at a time. In the context of JavaScript, this means it can handle one task at a time, processing operations sequentially without concurrent execution.

- **`Non-blocking event loop`**

  A non-blocking event loop in JavaScript allows the execution of asynchronous operations without blocking the main thread. This means that while one operation is waiting (e.g., for I/O), the event loop can continue executing other code, enabling efficient handling of multiple tasks.
