//creat a calculator class, this is where we will store all of the calculator funcitons
class Calculator {
    //assinging our two operators
    constructor(previousOperandEl, currentOperandEl) {
        this.previousOperandEl = previousOperandEl;
        this.currentOperandEl = currentOperandEl;
        this.clear()
    }
    //function to clear both operand fields and operator 
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    //deletes last number from currentOperand string
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    //function to prevent multiple decimals being added to currentOperand
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    //checking that conditions are met for operator to be applied
    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    //function for computing the operands, using a switch:case statement for our different operators
    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    //function defining paramters for our operand formating
    getDisplayNumber(number) {
        const stringNum = number.toString();
        const integerDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1];
       let integerDisplay
       if (isNaN(integerDigits)) {
           integerDisplay = '';
       } else {
           integerDisplay = integerDigits.toLocaleString('en', {
               maximumFractionDigits: 0
           })
       }
       if (decimalDigits != null) {
           return `${integerDisplay}.${decimalDigits}`
       } else {
           return integerDisplay
       }
    }
    //function to update our display when inputing values
    updateDisplay() {
        this.currentOperandEl.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
        this.previousOperandEl.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandEl.innerText = ''
        }
    }
}

//assigning our buttons 
const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-allClear]')
const previousOperandEl = document.querySelector('[data-previousOperand]')
const currentOperandEl = document.querySelector('[data-currentOperand]')

//creating a new instance of our calculator
const calculator = new Calculator(previousOperandEl, currentOperandEl)
//assinging event listeners to our different button classes, we call updateDislpay after every click for a continuously updated output screen
numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})
allClearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})