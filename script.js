var passwordLength = document.getElementById('password-length');
var number = document.getElementById('number');
var lowerCase = document.getElementById('lower-case');
var upperCase = document.getElementById('upper-case');
var symbol = document.getElementById('symbol');
var submit = document.getElementById('submit-button');
var generatedPassword = document.getElementById('result');

submit.onclick = function() {
  var result = generatePassword({
    length: parseInt(passwordLength.value),
    number: number.checked,
    lowerCase: lowerCase.checked,
    upperCase: upperCase.checked,
    symbol: symbol.checked
  });
  
  var text = 'Your password:<br><br>' + result + '<br><br>';
  
  var numChars = 0;
  numChars = number.checked ? numChars + 10 : numChars;
  numChars = lowerCase.checked ? numChars + 26 : numChars;
  numChars = upperCase.checked ? numChars + 26 : numChars;
  numChars = symbol.checked ? numChars + 13 : numChars;
  
  var strength = computePasswordStrength(numChars, result.length);
  text += '<span class="is-size-7">*It would take a computer about ';
  
  // miliseconds
  if (strength < 1) {
    text += (strength*1000).toFixed(3) + ' miliseconds';
  }
  
  // seconds
  if (strength < 60) {
    text += (strength).toFixed(3) + ' seconds';
  }
  
  // minutes
  if (strength <= 3600) {
    text += (strength/60).toFixed(3) + ' minutes';
  }
  
  // hours
  if (strength <= 86400) {
    text += (strength/3600).toFixed(3) + ' hours';
  }
  
  // days
  if (strength < 31557600) {
    text += (strength/86400).toFixed(3) + ' days';
  }
  
  // years
  if (strength >= 31557600) {
    text += (strength/31557600).toFixed(3) + ' years';
  }
  
  text += ' to crack your password</span>';
  
  generatedPassword.innerHTML = text;
  generatedPassword.classList.remove('is-hidden');
}

// generate random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// compute password strength
function computePasswordStrength(numChars, passwordLength) {
  var attemptPerSecond = 30000000;
  
  return (Math.pow(numChars, passwordLength)/attemptPerSecond);
}


// generate password
function generatePassword(options) {
  var symbols = [
    '!', '#', '$', '%', '&', '+', '-', '*', '@', '|', '_', '?', '^'
  ]
  
  var opt = typeof options === 'object' && options !== null ? options : {}
  var length = parseInt(opt.length) || 16;
  
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
      result += String.fromCharCode(getRandomInt(97, 123));
    }
    else if (comp[compIndex] === 'uc') {
      result += String.fromCharCode(getRandomInt(65, 91));
    }
    else if (comp[compIndex] === 'sym') {
      result += symbols[getRandomInt(0, symbols.length)];
    }
    else {
      result += getRandomInt(0, 10);
    }
  }
  
  return result;
}
