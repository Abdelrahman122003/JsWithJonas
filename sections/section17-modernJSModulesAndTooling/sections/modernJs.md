## overview of modern JS

<p align="center">
  <img src="./images/overviewOfModernJs.png" alt="alt-text" width="500"/>
</p>

- **Bundling**

  bundling refers to the process of combining multiple JavaScript files (and potentially other resources like CSS, images, etc.) into a single file or a few files. This technique is used to optimize web applications by reducing the number of HTTP requests needed to load the app and managing dependencies in a more efficient way.

- **Transpiling**

  JavaScript, transpiling is the process of converting code written in one version or dialect of JavaScript (or another language entirely) into a version that can be understood by older browsers or environments. This allows developers to write code using the latest JavaScript features while ensuring compatibility with environments that may not support them.

## Overview Of Modules

<p align="center">
  <img src="./images/modulesInGeneral.png" alt="alt-text" width="500"/>
</p>

## ES6 Modules Vs. Script

<p align="center">
  <img src="./images/jsModulesAndScript.png" alt="alt-text" width="500"/>
</p>

- **`Top Level Variables`**

  **Top-level variables** in JavaScript refer to variables that are declared in the highest scope of a program or script. These variables are not nested within any functions, classes, or blocks like if, for, etc. They exist at the top level of the code, either in the global scope (for scripts) or within the module scope (for modules).

  **What is the difference between CommonJS and ES6 Modules?**

- **`Module Scope`**

  - CommonJS:

    Variables and functions declared in a CommonJS module are scoped to that module, meaning they won’t be available globally unless explicitly exported.

  - ESM:

    ES Modules also have their own scope, but they are more strictly scoped than CommonJS, and they also support static analysis due to their design, meaning the structure of the module (what's imported and exported) is known at compile time.

## How ES6 modules are imported?

<p align="center">
  <img src="./images/whenModulesImportInES6.png" alt="alt-text" width="500"/>
</p>

**Why is importing synchronous and not asynchronous**

- Ensure predictable behavior: Since imports are resolved before any code runs, there are no surprises like circular dependencies or missing modules during execution.
- Maintain consistency: This static, synchronous behavior ensures modules load in a predictable order, making the code more reliable.

**Hoisting** in JavaScript is a behavior where variable and function declarations are moved to the top of their scope (global or function) during the compilation phase. This means you can use functions and variables before they are declared in the code. However, only the declarations are hoisted, not the initializations.

## Importing and Exporting(ES6 Modules)

- **`Export modules`**

  ```js
  // Named export: Exporting the addCart function by name
  export const addCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  // Named exports: Exporting totalPrice by name and renaming totalQuantity to tq when exporting
  const totalPrice = 237;
  const totalQuantity = 23;

  export { totalPrice, totalQuantity as tq }; // 'tq' is the alias for 'totalQuantity'

  // Default export: Exporting a function as the default export of the module
  // Default exports don't need a name and can be imported with any name
  export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  }
  ```

- **`Import Modules`**

  ```js
  "use strict";
  // Named import: Import specific named exports (addCart, totalPrice as price, tq) from the shoppingCart module
  import { addCart, totalPrice as price, tq } from "./shoppingCart.js";

  // Example usage of named imports
  console.log(addCart(23, 23)); // Adds 23 items of product 23 to the cart
  console.log(`The total price is: ${price}`); // Logs the total price (alias used as 'price')
  console.log(`The total quantity is: ${tq}`); // Logs the total quantity (exported as 'tq')

  console.log("importing module");

  // Import everything from the module as ShoppingCart object (namespace import)
  import * as ShoppingCart from "./shoppingCart.js";

  // Example usage of the namespace import
  ShoppingCart.addCart("bread", 4); // Calls the addCart method from the imported ShoppingCart object
  console.log(ShoppingCart.totalPrice); // Logs the total price from the ShoppingCart object

  // Import default export and named export together
  // Default export can be imported with any name (here as 'add')
  // Also importing named export 'cart' from the same module
  import add, { cart } from "./shoppingCart.js";

  // Example usage of default and named imports
  add("meat", 234); // Calls the default export function to add 234 units of 'meat' to the cart
  add("bread", 4); // Adds 'bread' to the cart
  add("oil", 3); // Adds 'oil' to the cart

  console.log(cart); // Logs the 'cart' array which contains all added products

  // You can combine imports: importing both default export and named exports in one line
  import add, { addCart, totalPrice as price, tq } from "./shoppingCart.js";

  // Example usage when combining imports
  addCart("bread", 4); // Using named import 'addCart'
  add("bread", 4); // Using default import 'add'
  console.log(`Total price: ${price}`); // Using named import 'price' (totalPrice)
  console.log(`Total quantity: ${tq}`); // Using named import 'tq' (totalQuantity)
  ```

## Module Pattern

This IIFE pattern mimics the behavior of `ES6 modules` by `encapsulating` data and exposing only what is necessary.
However, with ES6 modules, this process is more `explicit`, modern, and avoids the use of `closures` for encapsulation.
It allows for cleaner syntax and native module support across JavaScript environments.

```js
const ShoppingCart2 = (function () {
  // Variables defined inside the IIFE are part of the closure
  const cart = []; // Private variable (closure keeps it in memory)
  const shippingCost = 10; // Private variable (not exposed outside the IIFE)
  const totalPrice = 237; // Private variable (exposed via the returned object)
  const totalQuantity = 23; // Private variable (exposed via the returned object)

  // Public function (closure captures and remembers the variables in its scope)
  addToCart = function (product, quantity) {
    cart.push({ product, quantity }); // 'cart' is accessible because of closure
    console.log(`${quantity} ${product} added to cart`);
  };

  // Private function (not exposed; can only be used inside the IIFE)
  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} added to cart`);
  };

  // Return an object with public properties and methods
  return {
    addToCart, // Public method (closure allows it to access 'cart' and other variables)
    cart, // Publicly exposed, but accessing/modifying it directly is not recommended
    totalPrice, // Publicly exposed total price
    totalQuantity, // Publicly exposed total quantity
  };
})();

// 'addToCart' can still access the private 'cart' variable due to closure
ShoppingCart2.addToCart("Apple", 2); // Adds to 'cart' and logs "2 Apple added to cart"

// Trying to access 'shippingCost', which is not exposed in the returned object
console.log(ShoppingCart2.shippingCost); // undefined (not accessible due to closure)

// The idea is to encapsulate data and expose only what's necessary using closures.
```

## Importing and Exporting With CommonJs Type

```js
"use strict";
// Importing module
const { addCart } = require("./shoppingCart");
addCart("bread", 234);
```

```js
let cart = [];
const addCart = function (product, quantity) {
  cart.push({ quantity, product });
  console.log(`The product is ${product} and his quantity is ${quantity}`);
};

// Exporting Module
module.exports = {
  addCart,
};
```
