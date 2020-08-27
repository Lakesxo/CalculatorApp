class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.clearAll()
    }

    // Clear All function of the AC button
    clearAll(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.symbol = undefined
    }

    // Delete function of the Delete button
    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    // Percent button function
    percent(){
        let lolz = parseFloat(this.currentOperand)
        const computation = lolz / 100
        this.currentOperand = computation
    }

    // Function to select operation and compute when there's an input in the previous operand
    selectSymbol(symbol){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.symbol = symbol
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Concatenate numbers so it doesn't add when numbers are clicked
    attachNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        if(this.currentOperand.length <= 15){
            this.currentOperand = this.currentOperand.toString() + number.toString()
        } 
    }

    // Compute function to carry out all arithmetic operations
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.symbol) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation.toPrecision(1)
        this.symbol = undefined
        this.previousOperand = ''
    }

    // Adding commas to seperate larger numbers
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }

    // Updates output after every input
    updateOutput(){
        this.currentElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.symbol != null) {
            this.previousElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.symbol}`
        } else {
            this.previousElement.innerText = ''
        }
    }
}


// All needed buttons and elements selected from html
let numbers = document.querySelectorAll('[data-number]');
let symbols = document.querySelectorAll('[data-symbol]');
let deleteBtn = document.querySelector('[data-delete]');
let equalsBtn = document.querySelector('[data-equal]');
let clearBtn = document.querySelector('[data-clear]');
let previousElement = document.querySelector('[data-previous]');
let currentElement = document.querySelector('[data-current]');
let percentBtn = document.querySelector('[data-percent]')

//  Creating new class
const calculator = new Calculator(previousElement, currentElement)

// Attaching event listener  to all numbers and printing their respective value
numbers.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.attachNumber(btn.innerText)
        calculator.updateOutput()
    })
})

// Attaching event listener to all operation symbol buttons
symbols.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.selectSymbol(btn.innerText)
        calculator.updateOutput()
    })
})

// Attaching event listener to percent button
percentBtn.addEventListener('click', btn => {
    calculator.percent()
    calculator.updateOutput()
})

// Attaching event listener to equals button
equalsBtn.addEventListener('click', btn => {
    calculator.compute()
    calculator.updateOutput()
})

// Attaching event listener to AC button
clearBtn.addEventListener('click', btn => {
    calculator.clearAll()
    calculator.updateOutput()
})

// Attaching event listener to delete button
deleteBtn.addEventListener('click', btn => {
    calculator.delete()
    calculator.updateOutput()
})