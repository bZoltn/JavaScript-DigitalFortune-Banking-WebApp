'use strict';

// Data
const account1 = {
  owner: 'Ulbrecht Sander',
  email: 'us@email.com',
  movements: [200, 450, -437.56, 3000, -650, -130.45, 70, 1300],
  interestRate: 1.2,
  pin: 4444,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-11-23T07:42:02.383Z',
    '2022-11-28T09:15:04.904Z',
    '2022-12-01T10:17:24.185Z',
    '2022-12-08T14:11:59.604Z',
    '2022-12-26T17:01:17.194Z',
    '2023-01-19T23:36:17.929Z',
    '2023-01-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account2 = {
  owner: 'Zoltan Benke',
  email: 'test@email.com',
  movements: [1200, -2900.99, 3340, 5300, -2900.49, 5500, -3999.99, 1000],
  interestRate: 0.7,
  pin: 1234,

  movementsDates: [
    '2022-10-11T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-02T06:04:23.907Z',
    '2022-12-19T14:18:46.235Z',
    '2022-12-20T16:33:06.386Z',
    '2023-01-13T14:43:26.374Z',
    '2023-01-19T18:49:59.371Z',
    '2023-01-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const loginContainer = document.querySelector('.login');
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
const logo = document.querySelector('.logo');
const logoutBtn = document.getElementById('logout');
const body = document.querySelector('body');
// Functions
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed === 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formatedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate}</div>
     <div class="movements__value">${formatedMov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const updateUi = acc => {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
  localStorage.setItem('currentAccout', JSON.stringify(acc));
};

const logout = () => {
  logo.style.position = 'absolute';
  logo.style.top = '2rem';
  logo.style.left = '3rem';
  logoutBtn.style.display = 'none';
  body.style.backgroundImage = 'linear-gradient(to top left, #39b385, #9be15d)';
  labelWelcome.textContent = '';
  containerApp.style.opacity = 0;
  loginContainer.style.display = 'flex';
  labelWelcome.textContent = '';
  localStorage.removeItem('currentAccout');
};

const startLogOuttimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // At 0 sec, stop timer and log out
    if (time === 0) {
      clearInterval(timer);
      logout();
    }

    // Decrese 1 sec
    time--;
  };

  // Set time to 5 min
  let time = 300;

  // Call the timer every sec
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

logoutBtn.addEventListener('click', e => {
  e.preventDefault();
  logout();
});

const login = () => {
  loginContainer.style.display = 'none';
  body.style.backgroundImage = 'none';
  body.style.backgroundColor = '#f3f3f3';
  logoutBtn.style.display = 'flex';
  logo.style.position = 'relative';
  logo.style.top = '0rem';
  logo.style.left = '-1rem';
  // Display UI and welcome message
  labelWelcome.textContent = `Welcome back, ${
    currentAccout.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = 100;

  // Current time and date
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccout.locale,
    options
  ).format(now);

  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // Timer
  if (timer) clearInterval(timer);
  timer = startLogOuttimer();
  // Update UI
  updateUi(currentAccout);
};
let currentAccout;
document.addEventListener(
  'DOMContentLoaded',
  e => {
    e.preventDefault();
    currentAccout = JSON.parse(localStorage.getItem('currentAccout'));

    console.log(currentAccout);
    if (currentAccout.email) {
      login();
    }
  },
  true
);
// Event handlers

let timer;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccout = accounts.find(acc => acc.email === inputLoginUsername.value);
  if (currentAccout.email) {
    localStorage.setItem('currentAccout', JSON.stringify(currentAccout));
  }

  if (currentAccout?.pin === +inputLoginPin.value) {
    login();
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const reciverAcc = accounts.find(acc => acc.email === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    reciverAcc &&
    currentAccout.balance >= amount &&
    reciverAcc?.email !== currentAccout.email
  ) {
    // Doing the transfer
    currentAccout.movements.push(-amount);
    reciverAcc.movements.push(amount);

    // Add transfer date
    currentAccout.movementsDates.push(new Date().toISOString());
    reciverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUi(currentAccout);

    // Reset timer
    clearInterval(timer);
    timer = startLogOuttimer();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccout.movements.some(mov => mov >= amount * 0.1)) {
    // Timeout for loan approval
    setTimeout(() => {
      // Add movement
      currentAccout.movements.push(amount);

      // Add loan date
      currentAccout.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUi(currentAccout);

      // Reset timer
      clearInterval(timer);
      timer = startLogOuttimer();
    }, 5000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccout.email &&
    +inputClosePin.value === currentAccout.pin
  ) {
    const index = accounts.findIndex(acc => acc.email === currentAccout.email);
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccout, !sorted);
  sorted = !sorted;
});
