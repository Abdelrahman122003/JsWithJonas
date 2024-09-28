'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: 'zoombie',
  movements: [430, -1034, 730, 3450, -90],
  interestRate: 2,
  pin: 930290,
};

const accounts = [account1, account2, account3, account4, account5];

// For User who login now
let currAccount;
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
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

// Event Handlers

// For Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  // Another condition: currAccount && currAccount.pin === inputLoginPin.value
  if (currAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currAccount.owner.split(' ')[0]
    }`;
    // Clear input field after login
    inputLoginUsername.value = inputLoginPin.value = '';
    containerApp.style.opacity = 100;
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
  const amount = Number(inputTransferAmount.value);
  // Check first if the username you are transferring to exists,
  // and second if the amount being transferred to another account is less than or equal to the account balance.
  // Clear input
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    transferToAcc !== 'Not Found' &&
    transferToAcc.username !== currAccount.username
  ) {
    if (amount > 0 && currAccount?.balance >= amount) {
      // Update the logged-in user's account
      currAccount.movements.push(-amount);
      // Update the account of the user receiving the transfer
      transferToAcc.movements.push(amount);
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
  const pin = Number(inputClosePin.value);
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
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currAccount.movements.push(amount);
    // Update UI
    updateUI(currAccount);
  } else {
    console.log('Invalid Amount');
  }
  inputLoanAmount.value = '';
});

// For Sort movements
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////

// For Displaying movements

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
      `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculate the balance for users

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov, index, arr) => {
    return acc + mov;
  });
  labelBalance.textContent = `${account.balance} EUR`;
};

const calcDisplaySummary = function (account) {
  // Depoist
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  // Withdrawal
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  // Interest
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(depoist => (depoist * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// for existence of any user with input

const getAccountByUsername = function (username) {
  const account = accounts.find(acc => acc.username === username);
  return account ?? 'Not Found';
};

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
};
