const btn = document.querySelectorAll(".button");
const result = document.querySelector(".result");
let currentInput = "0";
let operator = "";
let firstOperand = "";
let waitingForSecondOperand = false;

//Function for calculation
const calculate = (first, second, operator) => {
    first = parseFloat(first);
    second = parseFloat(second);

    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return second === 0 ? "Error" : first / second;
        case "%":
            return (first * second) / 100;
        default:
            return second;
    }
};

// Function to handle number input
const handleNumber = (value) => {
    if (waitingForSecondOperand) {
        currentInput = value;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === "0" ? value : currentInput + value;
    }
}

// Function to handle operator input
const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === "") {
        firstOperand = currentInput;
    } else if (operator) {
        const result = calculate(firstOperand, currentInput, operator);
        currentInput = `${parseFloat(result.toFixed(7))}`;
        firstOperand = currentInput;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Function to handle decimal point
const handleDecimal = () => {
    if (waitingForSecondOperand) {
        currentInput = "0.";
        waitingForSecondOperand = false;
        return;
    }

    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

// Main input handler
const handleInput = (value) => {
    switch (value) {
        case "C":
            currentInput = "";
            break;
        case "delete":
            currentInput = currentInput.slice(0, -1);
            if (currentInput === "") {
                currentInput = "0"
            };
            break;
        case "=":
            if (operator && currentInput && firstOperand) {
                currentInput = calculate(firstOperand, currentInput, operator);
                operator = "";
                firstOperand = "";
                waitingForSecondOperand = false;
            }
            break;
        case '.':
            handleDecimal();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            handleOperator(value);
            break;
        default:
            handleNumber(value);
    }

    result.textContent = currentInput;
};

//When the buttons are clicked
btn.forEach((button) => {
    button.addEventListener("click", (e) => {
        const value = e.target.value;
        handleInput(value);
    });
});

// Event listener for keyboard presses 
document.addEventListener("keydown", (e) => {
    const key = e.key; const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "%", "+", "-", "*", "/", "Enter", "Backspace", "Escape"];
    if (allowedKeys.includes(key)) {
        if (key === "Enter") {
            handleInput("=");

        } else if (key === "Backspace") {
            handleInput("delete");
        } else if (key === "Escape") {
            handleInput("C");
        } else {
            handleInput(key);
        }
    }
});