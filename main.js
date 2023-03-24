class Calculator {
    constructor(previousNumberTextElement, currentNumberTextElement) {
        this.previousNumberTextElement = previousNumberTextElement;
        this.currentNumberTextElement = currentNumberTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = ''
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;

        switch(this.operation){
            case '+': 
                computation = Math.round((prev + curr) * 100) / 100;
                break;
            case '-':
                computation = Math.round((prev - curr) * 100) / 100;
                break;
            case '*':
                computation = Math.round((prev * curr) * 100) / 100;
                break;
            case '/':
                computation = Math.round((prev / curr) * 100) / 100;
                if(computation === Infinity) computation = "ERROR"
                break;
            default:
                return
                }
            this.currentOperand = computation;
            this.operation = '';
            this.previousOperand = '';
    }
    updateDisplay(){
        this.currentNumberTextElement.innerText = this.currentOperand;
        if(this.operation != undefined){
            this.previousNumberTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`;
        }
        
    }
}

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

const operate = (num1, num2, operator) => operator === '+' ? add(num1, num2) : operator === '-' ? subtract(num1, num2) : operator === '*' ? multiply(num1, num2) : divide(num1, num2);


const buttonNumbers = document.querySelectorAll('[data-number]');
const buttonOperators = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equal]');
const floatButton = document.querySelector('[data-float]');
const clearButton = document.querySelector('[data-clear]');

const previousNumberTextElement = document.querySelector('[data-previousNumber]');
const operand = document.querySelector('[data-operand]');
const currentNumberTextElement = document.querySelector('[data-currentNumber]');
const result = document.querySelector('[data-result]');

const calculator = new Calculator(previousNumberTextElement, currentNumberTextElement);

buttonNumbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});
buttonOperators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})