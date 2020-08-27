class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.clearAll()
    }
    clearAll(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.symbol = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    selectSymbol(symbol){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.symbol = symbol
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    attachNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
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
        this.currentOperand = computation
        this.symbol = undefined
        this.previousOperand = ''
    }
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

    updateOutput(){
        this.currentElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.symbol != null) {
            this.previousElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.symbol}`
        } else {
            this.previousElement.innerText = ''
        }
    }
}


// All needed buttons selected from html
let numbers = document.querySelectorAll('[data-number]');
let symbols = document.querySelectorAll('[data-symbol]');
let deleteBtn = document.querySelector('[data-delete]');
let equalsBtn = document.querySelector('[data-equal]');
let clearBtn = document.querySelector('[data-clear]');
let previousElement = document.querySelector('[data-previous]');
let currentElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousElement, currentElement)

numbers.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.attachNumber(btn.innerText)
        calculator.updateOutput()
    })
})

symbols.forEach(btn => {
    btn.addEventListener('click', ()=> {
        calculator.selectSymbol(btn.innerText)
        calculator.updateOutput()
    })
})

equalsBtn.addEventListener('click', btn => {
    calculator.compute()
    calculator.updateOutput()
})

clearBtn.addEventListener('click', btn => {
    calculator.clearAll()
    calculator.updateOutput()
})

deleteBtn.addEventListener('click', btn => {
    calculator.delete()
    calculator.updateOutput()
})