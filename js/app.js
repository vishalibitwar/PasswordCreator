const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
let isSetAlert;

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', function () {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password)
    return '';

  textarea.value = password;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  showAlert('success', 'Copied to Clipboard');
});

function showAlert(color, message) {

  const alert = document.getElementById('alert');
  if (!alert.classList.contains(`alert-` + color, 'p-1')) {
    alert.classList.add(`alert-` + color, 'p-1');
    alert.innerText = message;
    animate(alert, 'shake');

    setTimeout(() => {
      alert.classList.remove(`alert-` + color, 'p-1');
      alert.innerText = '';
    }, 2000);

  }

}



generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  if (length == 0) {
    showAlert('danger', 'Enter Length...');
  } else if (length > 16) {
    showAlert('danger', 'Password Max-length is 16');
  } else {
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    animate(resultEl, 'jackInTheBox');
  }
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{
    lower
  }, {
    upper
  }, {
    number
  }, {
    symbol
  }].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    showAlert('danger', 'Please, select Include field');
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 47);
}

function getRandomSymbol() {
  const symbols = '@!#$&*';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function animate(element, animation) {
  element.classList.add('animated', animation);
  const wait = setTimeout(() => {
    element.classList.remove('animated', animation);
  }, 900);
}