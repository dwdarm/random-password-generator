var SYMBOLS = [
  '!', '#', '$', '%', '&', '+', '-', '*', '@', '|', '_', '?', '^'
]

var LENGHT_OF_NUMBERS = 10;
var LENGTH_OF_LOWER_CASE_ALPHABETS = 26;
var LENGTH_OF_UPPER_CASE_ALPHABETS = 26;
var LENGTH_OF_SYMBOLS = SYMBOLS.length;
var PASSWORD_DEFAULT_LENGTH = 16;

var ATTEMPTS_PER_SECOND = 30000000;
var ONE_MILISECOND = 1000;
var ONE_SECOND = 1;
var ONE_MINUTE_IN_SECOND = 60;
var ONE_HOUR_IN_SECOND = 3600;
var ONE_DAY_IN_SECOND = 86400;
var ONE_YEAR_IN_SECOND = 31557600;

var LOWER_CASE_ALPHABETS_INDEX_START = 97;
var LOWER_CASE_ALPHABETS_INDEX_END = 123;
var UPPER_CASE_ALPHABETS_INDEX_START = 65;
var UPPER_CASE_ALPHABETS_INDEX_END = 91;

var passwordLength = document.getElementById('password-length');
var number = document.getElementById('number');
var lowerCase = document.getElementById('lower-case');
var upperCase = document.getElementById('upper-case');
var symbol = document.getElementById('symbol');
var submit = document.getElementById('submit-button');
var generatedPassword = document.getElementById('result');

submit.onclick = handleSubmitClick;

function handleSubmitClick() {
  var numberOfChars = 0;
  
  numberOfChars = number.checked 
    ? numberOfChars + LENGHT_OF_NUMBERS : numberOfChars;
    
  numberOfChars = lowerCase.checked 
    ? numberOfChars + LENGTH_OF_LOWER_CASE_ALPHABETS : numberOfChars;
  
  numberOfChars = upperCase.checked 
    ? numberOfChars + LENGTH_OF_UPPER_CASE_ALPHABETS : numberOfChars;
  
  numberOfChars = symbol.checked 
    ? numberOfChars + LENGTH_OF_SYMBOLS : numberOfChars;
  
  var password = generatePassword({
    length: parseInt(passwordLength.value),
    number: number.checked,
    lowerCase: lowerCase.checked,
    upperCase: upperCase.checked,
    symbol: symbol.checked
  });
  
  var passwordStrength = computePasswordStrength(numberOfChars, password.length);
  var formattedPasswordStrength = formatSecondsToString(passwordStrength);
  
  printResult(password, formattedPasswordStrength);
}


function printResult(password, strength) {
  var text = 'Your password:<br><br>' + password + '<br><br>';
  text += '<span class="is-size-7">*It would take a computer about ';
  text += strength;
  text += ' to crack your password</span>';
  generatedPassword.innerHTML = text;
  generatedPassword.classList.remove('is-hidden');
}


function formatSecondsToString(seconds) {
  var FIXED = 3;
  
  if (seconds < ONE_SECOND) {
    return (seconds*ONE_MILISECOND).toFixed(FIXED) + ' miliseconds';
  }
  else if (seconds <= ONE_MINUTE_IN_SECOND) {
    return (seconds).toFixed(FIXED) + ' seconds';
  }
  else if (seconds < ONE_HOUR_IN_SECOND) {
    return (seconds/ONE_MINUTE_IN_SECOND).toFixed(FIXED) + ' minutes';
  }
  else if (seconds < ONE_DAY_IN_SECOND) {
    return (seconds/ONE_HOUR_IN_SECOND).toFixed(FIXED) + ' hours';
  }
  else if (seconds < ONE_YEAR_IN_SECOND) {
    return (seconds/ONE_DAY_IN_SECOND).toFixed(FIXED) + ' days';
  }
  
  return (seconds/ONE_YEAR_IN_SECOND).toFixed(FIXED) + ' years';
}


// compute password strength
function computePasswordStrength(numberOfChars, passwordLength) {
  return (Math.pow(numberOfChars, passwordLength)/ATTEMPTS_PER_SECOND);
}


// generate password
function generatePassword(options) {
  var opt = typeof options === 'object' && options !== null ? options : {}
  var length = parseInt(opt.length) || PASSWORD_DEFAULT_LENGTH;
  
  var comp = []
  if (opt.lowerCase !== false) {
    comp.push('lc');
  } 
    
  if (opt.upperCase !== false) {
    comp.push('uc');
  } 
    
  if (opt.number !== false) {
    comp.push('num');
  } 
  
  if (opt.symbol !== false) {
    comp.push('sym');
  } 
  
  if (comp.length === 0) {
    comp.push('num');
  }
  
  var result = '';
  
  for (var i = 0; i < length; i++) {
    var compIndex = getRandomInt(0, comp.length);
    if (comp[compIndex] === 'lc') {
      result += String.fromCharCode(
        getRandomInt(
          LOWER_CASE_ALPHABETS_INDEX_START, 
          LOWER_CASE_ALPHABETS_INDEX_END
        )
      );
    }
    else if (comp[compIndex] === 'uc') {
      result += String.fromCharCode(
        getRandomInt(
          UPPER_CASE_ALPHABETS_INDEX_START, 
          UPPER_CASE_ALPHABETS_INDEX_END
        )
      );
    }
    else if (comp[compIndex] === 'sym') {
      result += SYMBOLS[getRandomInt(0, LENGTH_OF_SYMBOLS)];
    }
    else {
      result += getRandomInt(0, 10);
    }
  }
  
  return result;
}


// generate random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
