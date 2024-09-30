## JavaScript Date Parameters

January 1, 1970, 00:00:00 UTC is the starting point (also called the `epoch`) used in computing systems to represent time. This moment is treated as time zero in many programming languages, including JavaScript.

In JavaScript, the `Date` object is used to work with dates and times. The `Date` constructor can accept different types of parameters:

1. No Parameters

   If no parameters are provided, the `Date` object is created with the current date and time.

   ```javascript
   let currentDate = new Date();
   console.log(currentDate);
   ```

2. Milliseconds since Epoch (Unix Timestamp)

   You can create a date object by passing the number of milliseconds since January 1, 1970 (Unix Epoch).

   ```javascript
   let dateFromMillis = new Date(1609459200000); // Corresponds to Jan 1, 2021
   console.log(dateFromMillis);
   ```

3. Date String

   You can pass a date string that will be parsed to create the date object.

   ```javascript
   let dateFromString = new Date("2021-01-01T00:00:00Z");
   console.log(dateFromString);
   ```

4. Individual Date Parameters

   The `Date` constructor can take individual numeric parameters in the following order:

   ```javascript
   new Date(year, month, day, hours, minutes, seconds, milliseconds);
   ```

- **year**: A four-digit number representing the year.
- **month**: A number between 0 and 11 representing the month (0 = January, 11 = December).
- **day**: (Optional) A number between 1 and 31 representing the day of the month.
- **hours**: (Optional) A number between 0 and 23 representing the hour of the day.
- **minutes**: (Optional) A number between 0 and 59 representing the minute.
- **seconds**: (Optional) A number between 0 and 59 representing the second.
- **milliseconds**: (Optional) A number between 0 and 999 representing the millisecond.

Example:

```javascript
let specificDate = new Date(2023, 8, 30, 12, 30, 0); // September 30, 2023, 12:30:00 PM
console.log(specificDate);
```

## Key Methods Returning Zero-Indexed Values

- getMonth():

  - Returns the month of a Date object as a zero-based number.
  - Range: 0 (January) to 11 (December).

  ````js
  let date = new Date('2023-09-30');
  console.log(date.getMonth()); // Output: 8 (September)
  getDay():```
  ````

- getDay()

  - Returns the day of the week as a zero-based number.
  - Range: 0 (Sunday) to 6 (Saturday).

  ```js
  let date = new Date("2023-09-30");
  console.log(date.getDay()); // Output: 6 (Saturday)
  ```

## Operation With Dates

**For example, a function that calculates the number of days passed for any event.**

```js
const getPassedDays = (date1, date2) => (date2 - date1) / (1000, 60, 60, 24);
```

## Internationalizing Dates(Intl)

**This code uses the Intl.DateTimeFormat object to format dates based on a specific locale.**

```js
// To retrieve your own locale
const locale = navigator.language; //en-US
// you can replace locale with 'ar-EG'
const format = new Intl.DateTimeFormat("ar-EG", YourOwnOptions).format(
  new Date()
);
```

**You can configure options for this format, for example:**

```js
const YourOwnOptions = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", //short, long, numberic ...
  year: "numeric",
  weekday: "short", //short, long, numberic ...
};
```

- `new Intl.DateTimeFormat("ar-EG")`:

  - Creates a `new DateTimeFormat` object that formats dates for the `ar-EG` locale, which is Arabic (Egypt).
  - This ensures that the date is displayed in a way that's familiar to Arabic speakers in Egypt.

- `format(new Date())`:
  - This method formats the current date (from `new Date()`) according to the specified locale (`ar-EG`).
  - It converts the date into a string that follows the date format used in the Arabic (Egypt) locale.

[To get the name of a specific country using the Intl API.
](http://www.lingoes.net/en/translator/langcode.htm)

## Internationalizing Numbers(Intl)

Use the Intl.NumberFormat object to format numbers based on locale. This can handle decimal separators, grouping separators, and currency symbols.

```js
const number = 1234567.89;
const formatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});
console.log(formatter.format(number)); // "1.234.567,89 €"
```

## Timers

**Basic structure**

```js
timerFunction(yourFunction, time);
```

- `setTimeout()`

  Executes a function once after a specified delay (in milliseconds). It's used for delaying a single action.

  ```js
  setTimeout(
    (ing1, ing2) =>
      console.log(
        `The pizza order reach after 3 seconds, pizza contain of ${ing1} and ${ing2}`
      ),
    2000,
    "olives",
    "meat"
  );

  ingredients = ["olives", "meat", "milk", "chesse"];
  setTimeout(
    (ing1, ing2) =>
      console.log(
        `The pizza order reach after 3 seconds, pizza contain of ${ing1} and ${ing2}`
      ),
    2000,
    ...ingredients
  );
  ```

- `setInterval()`

  Repeatedly executes a function at regular intervals (in milliseconds) until canceled. It's used for repeating actions at a consistent rate.

  ```js
  setInterval(() => {
    console.log(new Date());
  }, 1000);
  ```
