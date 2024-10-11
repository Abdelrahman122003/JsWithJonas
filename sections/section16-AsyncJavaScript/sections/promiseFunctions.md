## Promises Function

### Promise.all()

Promise.all() is a method in JavaScript that takes an array (or iterable) of promises and returns a single promise. This returned promise resolves when all of the promises in the array have successfully resolved. If all the promises resolve, Promise.all() returns an array of their results in the same order as the input.

```js
const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};
const get3Countries = async function (c1, c2, c3) {
  try {
    // => Each one operates independently and executes sequentially
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);
    // All execute in parallel
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries("portugal", "canada", "tanzania");
```

### Promise.race()

In JavaScript, `Promise.race()` is a method that takes an iterable (like an array) of promises and returns a new promise.

In `Promise.race()`, the outcome depends on which promise settles (either resolves or rejects) first.

- If a promise resolves first, Promise.race() returns that resolved value.
- If a promise rejects first, Promise.race() returns that rejection reason.

```js
const getJSON = function (url, errMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};
const setTime = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long"));
    }, sec * 1000);
  });
};
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/italy`),

  setTime(0.07),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));
```

### Promise.allSettled()

The `Promise.allSettled()` function in JavaScript takes an array of promises and returns a promise that resolves once all the input promises have settled, either by fulfilling or rejecting.

The resulting promise resolves to an array of objects, where each object describes the outcome of each promise:

- If a promise is **fulfilled**, the object will have a status of "fulfilled" and a value property containing the resolved value.
- If a promise is **rejected**, the object will have a status of "rejected" and a reason property containing the rejection reason.

```js
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => {
    console.log("hallo world");
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// Ouput

// 0:{status: 'fulfilled', value: 'Success'}
// 1:{status: 'rejected', reason: 'Error'}
// 2:{status: 'fulfilled', value: 'Another success'}
```

### Promise.any()

Promise.any() is a method in JavaScript that takes an array of promises and returns a promise that resolves as soon as any one of the promises resolves successfully. If at least one promise fulfills, it returns the value of that fulfilled promise. However, if all promises reject, Promise.any() rejects with an AggregateError, which contains all the rejection reasons.

```js
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Another success"),
])
  .then((res) => {
    console.log("hallo world");
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// Ouput:
// Success
```
