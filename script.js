// Calculator State
let display = '0';
let previousValue = null;
let operator = null;
let memory = 0;
let history = [];
let newNumber = true;

// DOM Elements
const displayElement = document.getElementById('display');
const historyElement = document.getElementById('history');
const memoryElement = document.getElementById('memory');
const historyList = document.getElementById('historyList');

// Initialize
updateDisplay();

// Append Number
function appendNumber(num) {
    if (display === '0' || newNumber) {
        display = num;
        newNumber = false;
    } else {
        display += num;
    }
    updateDisplay();
}

// Append Operator
function appendOperator(op) {
    if (operator !== null && !newNumber) {
        calculate();
    }
    previousValue = parseFloat(display);
    operator = op;
    historyElement.textContent = display + ' ' + op;
    newNumber = true;
}

// Calculate
function calculate() {
    if (previousValue === null || operator === null) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            if (currentValue === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            result = previousValue / currentValue;
            break;
        case '%':
            result = previousValue % currentValue;
            break;
        default:
            return;
    }

    // Add to history
    const calculation = `${previousValue} ${operator} ${currentValue} = ${result}`;
    addToHistory(calculation);

    // Format result
    result = Math.round(result * 100000000) / 100000000;
    display = result.toString();
    operator = null;
    previousValue = null;
    newNumber = true;
    updateDisplay();
}

// Clear Display
function clearDisplay() {
    display = '0';
    previousValue = null;
    operator = null;
    newNumber = true;
    historyElement.textContent = '0';
    updateDisplay();
}

// Delete Last Digit
function deleteLast() {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = '0';
    }
    updateDisplay();
}

// Toggle Sign
function toggleSign() {
    const value = parseFloat(display);
    display = (value * -1).toString();
    updateDisplay();
}

// Square Root
function calculateSquareRoot() {
    const value = parseFloat(display);
    if (value < 0) {
        alert('Cannot calculate square root of negative number!');
        return;
    }
    const result = Math.sqrt(value);
    const calculation = `√${value} = ${result}`;
    addToHistory(calculation);
    display = result.toString();
    newNumber = true;
    updateDisplay();
}

// Power (x²)
function calculatePower() {
    const value = parseFloat(display);
    const result = value * value;
    const calculation = `${value}² = ${result}`;
    addToHistory(calculation);
    display = result.toString();
    newNumber = true;
    updateDisplay();
}

// Power (x³)
function calculatePower3() {
    const value = parseFloat(display);
    const result = value * value * value;
    const calculation = `${value}³ = ${result}`;
    addToHistory(calculation);
    display = result.toString();
    newNumber = true;
    updateDisplay();
}

// Memory Functions
function memoryAdd() {
    memory += parseFloat(display);
    newNumber = true;
    updateDisplay();
}

function memorySubtract() {
    memory -= parseFloat(display);
    newNumber = true;
    updateDisplay();
}

function memoryRecall() {
    display = memory.toString();
    newNumber = true;
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    updateDisplay();
}

// Update Display
function updateDisplay() {
    displayElement.textContent = display;
    memoryElement.textContent = 'Memory: ' + memory;
}

// Add to History
function addToHistory(calculation) {
    history.unshift(calculation);
    if (history.length > 10) {
        history.pop();
    }
    updateHistoryDisplay();
}

// Update History Display
function updateHistoryDisplay() {
    if (history.length === 0) {
        historyList.innerHTML = '<p>No calculations yet</p>';
        return;
    }

    historyList.innerHTML = history
        .map(item => `<div class="history-item">${item}</div>`)
        .join('');
}

// Clear History
function clearHistory() {
    history = [];
    updateHistoryDisplay();
}

// Keyboard Support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        event.preventDefault();
        appendOperator('*');
    } else if (key === '/') {
        event.preventDefault();
        appendOperator('/');
    } else if (key === '%') {
        appendOperator('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});