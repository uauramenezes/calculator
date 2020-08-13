let button = document.querySelectorAll('button.button')
let display = document.getElementById('display');
let clearText = document.getElementById('clear');
let decimal = document.getElementById('decimal')
let operator = '';
let lastNumber = '';
let firstNumber;
let secondNumber;

button.forEach((button) => {
    button.addEventListener('click', () => {
        clearText.textContent = 'C'
        if (button.value === '+' || button.value === '-' || 
            button.value === '/' || button.value === '*') {
            if (operator.length === 0) {
                operator = button.value
                firstNumber = Number(lastNumber)
                lastNumber = ''
            } else {
                operate(operator)
                operator = button.value
                lastNumber = ''
            }
        } else if (button.value === '=') {
            if (operator.length !== 0 && lastNumber.length !== 0) {
                operate(operator)
                operator = ''
                lastNumber = firstNumber
            } 
        } else if (button.value === 'clear') {
            clear()
        } else if (button.value === 'erase') {
            lastNumber = lastNumber.slice(0, - 1)
            display.placeholder = lastNumber
        } else if (button.value === '.') {
            if (lastNumber.split('.').length > 1) {
                decimal.setAttribute('disabled', 'disabled')
            }
            if (lastNumber.split('.').length === 1) {
                decimal.removeAttribute('disabled')
                lastNumber += button.value;
                display.placeholder = lastNumber;
            }
        } else if (lastNumber.length < 7) {
            lastNumber += button.value;
            display.placeholder = lastNumber;
            if (lastNumber[0] === '0') {
                lastNumber = 0
                lastNumber = ''
            }
            
        }
    })
})

function operate(value) {
    secondNumber = Number(lastNumber)
    if (value == '+') {
        add(firstNumber, secondNumber);
    }
    if (value == '-') {
        subtract(firstNumber, secondNumber);
    }
    if (value == '*') {
        multiply(firstNumber, secondNumber);
    }
    if (value == '/') {
        divide(firstNumber, secondNumber);
    }
}

function add(x, y) {
    let result = +(x + y).toFixed(3)
    display.placeholder = result
    firstNumber = result
}

function subtract(x, y) {
    let result = +(x - y).toFixed(3)
    display.placeholder = result
    firstNumber = result
}

function multiply(x, y) {
    let result = +(x * y).toFixed(3)
    display.placeholder = result
    firstNumber = result
}

function divide(x, y) {
    if (y === 0) {
        display.placeholder = 'ERROR'
    } else {
        let result = +(x / y).toFixed(3)
        display.placeholder = result
        firstNumber = result 
    }
}

function clear() {
    operator = '';
    lastNumber = '';
    firstNumber;
    secondNumber;
    display.placeholder = ''
    clearText.textContent = 'AC'
    decimal.removeAttribute('disabled')
}
