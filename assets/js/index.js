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

    }
    selectSymbol(symbol){

    }
    attachNumber(number){
        this.currentOperand = number
    }
    compute(){

    }
    updateOutput(){
        this.currentElement.innerText = this.currentOperand
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