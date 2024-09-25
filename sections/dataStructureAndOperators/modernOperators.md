## The Spread Operator

The spread operator (...) in JavaScript allows you to expand or spread elements of an iterable (like arrays, objects, or strings) into individual elements.

```js
// SPREAD, because on RIGHT side of =
// Iterables: arrays, Strings, maps, sets, NOT Objects
const arr = [1, 3, 4];
const newArr = [34, 5, ...arr];
console.log(newArr); // 34, 5, 1, 3, 4
```

```js
//With Function

function orderPasta(ing1, ing2, ing3) {
  console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
}
const ings = ["meet", "chesee", "oil", "eggs"];

orderPasta(...ings);
// Ouput: Here is your delicious pasta with meet, chesee and oil
```

```js
//Objects
const person = {
  name: "zoombie",
  age: 21,
};

const personM = {
  studying: "computer science",
  ...person,
  gpYear: "2025",
};
console.log(personM);
//Ouput: Object { studying: "computer science", name: "zoombie", age: 21, gpYear: "2025" }
```

## Rest Pattern

```js
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
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
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  OpenningHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// Rest, because on LEFT side of =

// Example 1
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//Ouput: 1 2 Array(3) [ 3, 4, 5 ]

// Example 2
const [pizza, , risotto, ..otherFood] = {
    ...restur
}
console.log(pizza, risotto, ...otherFood);
// Output: Pizza Risotto Focaccia Bruschetta Garlic Bread Caprese Salad
```

## Short Circuiting

`short-circuiting` refers to the behavior of logical operators (||, &&) where they stop evaluating as soon as the result is determined.

- `|| operator`

  - It evaluates the operands from left to right.
  - The first truthy value it encounters is immediately returned.
  - If all values are falsy, the last value is returned.

    ```js
    console.log(3 || "jonas"); // 3
    console.log("" || "jonas"); // jonas
    console.log(true || 0); // true
    console.log(undefined || null); // null
    conole.log(undefined || 0 || "" || "hallo" || 23 || null); //hallo
    ```

- `&&` operator

  - It evaluates the operands from left to right.
  - The first falsy value it encounters is immediately returned.
  - If all values are truthy, the last value is returned.

    ```js
    console.log(3 && "jonas"); // jonas
    console.log("" && "jonas"); // ""
    console.log(true && 0); // 0
    console.log(undefined && null); // undefined
    conole.log(undefined && 0 && "" && "hallo" && 23 && null); //undefined
    ```

## Nullish coalescing operator

The nullish coalescing operator (??) in JavaScript is used to return the right-hand value when the left-hand value is null or undefined. It’s similar to the OR (||) operator

```js
const value = null ?? "Default";
console.log(value); // "Default" (because null is nullish)

const anotherValue = 0 ?? "Default";
console.log(anotherValue); // 0 (because 0 is not nullish)
```

## Iterate over the array using of

```js
const items = ["balh", "zora"];

for (const item of items) console.log(item);
// output:
// balh
// zora

for (const item of items.entries()) console.log(item);
// output:
// [0, balh]
// [1, zora]
for (const [index, ele] of items.entries())
  console.log(`index is : ${index} and item is : ${ele}`);
// Output:
// index is : 0 and item is : balh
// index is : 1 and item is : zora
// index is : 2 and item is : oil
```

## Optional Chaining

```js
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
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
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  OpenningHours,
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};
// For Example:

console.log(restaurant.OpenningHours.mon.open) // TypeError: restaurant.OpenningHours.mon is undefined

// To avoid this errors use Optional Chaining

console.log(restaurant.OpenningHours.mon?.open); // undefined
console.log(restaurant.OpenningHours.fri?.open); // 11

// Example

for (const day of weekdays) {
  console.log(
    // with Or operator
    `On ${day}, we open at ${restaurant.OpenningHours[day]?.open || "Closed"}`
    // with Nullish operator
    // `On ${day}, we open at ${restaurant.OpenningHours[day].open ?? "Closed"}`
  );
}
// Output:
// On mon, we open at Closed script.js:30:11
// On tue, we open at Closed script.js:30:11
// On wed, we open at Closed script.js:30:11
// On thu, we open at 12 script.js:30:11
// On fri, we open at 11 script.js:30:11
// On sat, we open at Closed script.js:30:11
// On sun, we open at Closed
```
