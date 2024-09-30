'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2024-09-28T14:43:26.374Z',
    '2024-09-29T18:49:59.371Z',
    '2024-09-30T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// For User who login now
let currAccount, timer;
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Computing all the usernames from the owner's name
const createUsernames = function (accounts) {
  // Using forEach to iterate over each account
  accounts.forEach(function (acc) {
    // Create a username by splitting the owner's name by space,
    // taking the first letter of each part, converting to lowercase, and joining them
    acc.username = acc.owner
      .split(' ') // Split the full name into an array of words
      .map(ele => ele[0].toLowerCase()) // Get the first letter of each word and convert it to lowercase
      .join(''); // Join the letters to form the username
  });
};
createUsernames(accounts);

// ================================Event Handlers============================================

// For Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  console.log(currAccount);
  // Another condition: currAccount && currAccount.pin === inputLoginPin.value
  if (currAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currAccount.owner.split(' ')[0]
    }`;
    // Clear input field after login
    inputLoginUsername.value = inputLoginPin.value = '';
    containerApp.style.opacity = 100;
    // Create current date and time
    displayDate(new Date());
    // Timer
    if (timer) clearInterval(timer);
    timer = starLogOutTimer();
    // update UI
    updateUI(currAccount);
  } else {
    alert('Your username or password is not correct, Please Try again!');
  }
});

// For transferring to another account

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferToAcc = getAccountByUsername(inputTransferTo.value);
  const amount = +inputTransferAmount.value;
  // Check first if the username you are transferring to exists,
  // and second if the amount being transferred to another account is less than or equal to the account balance.
  // Clear input
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    transferToAcc !== 'Not Found' &&
    transferToAcc.username !== currAccount.username
  ) {
    if (amount > 0 && currAccount?.balance >= amount) {
      // Add movement to the logged-in user's account
      currAccount.movements.push(-amount);
      // Add transfer date
      currAccount.movementsDates.push(new Date());
      // Add movement to recieved account
      transferToAcc.movements.push(amount);
      // Add date
      transferToAcc.movementsDates.push(new Date());

      // Update UI
      updateUI(currAccount);
    } else {
      console.log('Amount not valid');
    }
  } else {
    console.log('This Username not Exist, Please Try again');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  // check username and password is correct

  if (currAccount.username === username && currAccount.pin === pin) {
    const getIndex = accounts.findIndex(acc => acc.username === username);
    // Delete the current user
    accounts.splice(getIndex, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log('Your username or password is Incorrect, Please Try again!');
  }
  inputLoginPin.value = inputLoginUsername.value = '';
});

// For Loan request

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Wait for 3 seconds then excute the loan
    setTimeout(function () {
      // Add movement
      currAccount.movements.push(amount);
      // Add loan date
      currAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currAccount);
    }, 3000);
  } else {
    console.log('Invalid Amount');
  }

  inputLoanAmount.value = '';
});

// For Sort movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currAccount, !sorted);
  sorted = !sorted;
});
// ====================================== Dates Formating handler ===================================

// Make date with format day/month/year
const makeDateDMY = function (date) {
  // get day
  const day = `${date.getDate()}`.padStart(2, 0);
  // get month
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // get year
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
// Make time with format hours:min
const makeTimeHM = function (date) {
  // get hours
  const hours = date.getHours();
  // get minutes
  const min = `${date.getMinutes()}`.padStart(2, 0);
  // return speific format hours:minutes
  return `${hours}.:${min}`;
};
// Get how many days have passed
const getPassedDays = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// Options for Dates
const dateOptions = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric', //short, long, numberic ...
  year: 'numeric',
  weekday: 'long', //short, long, numberic ...
};
// Make date based in locale without/With options
const makeDateBlocale = function (date, options = {}) {
  return new Intl.DateTimeFormat(currAccount.locale, options).format(
    new Date(date)
  );
};

// ================================== Numbers formating handlers =================================

const formatNumberByLocale = function (number, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(number);
};
// =================================== timers =======================================
const logout = function () {};
const starLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  const trick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer nad log out user
    if (!time) {
      clearInterval(timer);
      labelTimer.textContent = 'Log in to get started';
      containerApp.style.opacity = 100;
    }
    // decrease time
    time--;
  };

  trick();
  return setInterval(trick, 1000);
};
// ================================== Business Logic for the Application ======================================

// Decision on what to display for the movement date
const decisionMovementDate = function (date) {
  const passedDays = Math.round(getPassedDays(new Date(), date));
  console.log('passDays: ', passedDays);
  let format;
  if (passedDays == 0) format = `Today`;
  else if (passedDays == 1) format = `Yesterday`;
  else if (passedDays <= 7) format = `${passedDays} day ago`;
  else format = makeDateBlocale(date, currAccount.locale);
  return format;
};
// display now date in your account below your balance
const displayDate = function (date) {
  labelDate.textContent = makeDateBlocale(date, dateOptions);
};
// For Displaying movements

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementsDates[i]);
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${decisionMovementDate(date)}</div>
    <div class="movements__value">${formatNumberByLocale(
      Math.abs(mov),
      account.locale,
      account.currency
    )}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate the balance for users and display it

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov, index, arr) => {
    return acc + mov;
  });
  labelBalance.textContent = formatNumberByLocale(
    account.balance,
    account.locale,
    account.currency
  );
};

const calcDisplaySummary = function (account) {
  // Depoist
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatNumberByLocale(
    Math.abs(incomes),
    account.locale,
    account.currency
  )}`;
  // Withdrawal
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatNumberByLocale(
    Math.abs(outcomes),
    account.locale,
    account.currency
  )}`;
  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(depoist => (depoist * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatNumberByLocale(
    Math.abs(interest),
    account.locale,
    account.currency
  )}`;
};

// for existence of any user with input

const getAccountByUsername = function (username) {
  const account = accounts.find(acc => acc.username === username);
  return account ?? 'Not Found';
};

const updateUI = function (account) {
  // Display movements
  displayMovements(account);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
};
// Always logged in

// const alwaysLogged = function (account) {
//   updateUI(account);
//   containerApp.style.opacity = 100;
// };

// alwaysLogged(account2);
