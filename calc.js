const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

function updateDisplay() {
  display.value = currentInput || '0';
}


function calculate() {
  try {
   
    const sanitized = currentInput.replace(/[^-()\d/*+.]/g, '');
    currentInput = eval(sanitized).toString();
  } catch (e) {
    currentInput = 'Error';
  }
  updateDisplay();
}


function handleInput(key) {
  if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (key === 'C') {
    currentInput = '';
    updateDisplay();
  } else if (/[\d.+\-*/]/.test(key)) {
    if (currentInput === 'Error') currentInput = '';
    currentInput += key;
    updateDisplay();
  }
}


buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-key');
    handleInput(key);
  });
});


document.addEventListener('keydown', (e) => {
  handleInput(e.key);
});
