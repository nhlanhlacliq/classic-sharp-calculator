// Calculator Class
class Calculator {
    constructor() {
        this.stack = [];
        this.currentNumber = 0;
        this.tempResult = 0;
        this.previousOperation = undefined;
        this.previousNumber = undefined;
    }
    
    appendNumber(number) {
        if (this.currentNumber === 0) {
            this.currentNumber = number;
            this.clearTempResult();
            return this.updateDisplay(this.currentNumber);
        }
        this.currentNumber += number.toString();
        return this.updateDisplay(this.currentNumber.toString());
    }

    addOperation(operation) {
        this.previousNumber = this.currentNumber;
        if (this.tempResult != 0) {
            this.stack.push(this.tempResult);
        } else {
            this.stack.push(this.currentNumber);
        }
        this.setPreviousOperation(operation);
        this.stack.push(operation);
        this.clearCurrentNumber();
    }

    updateDisplay(value) {
        display.textContent = value;
    }

    equals() {
        // If there's only one number of the stack just return to prevent users from constantly pressing equals to add zeros on the stack
        if (this.stack.length <= 1) {
            // If number on stack isnt zero then keep applying the previous operation as the actual calculator does
            if (this.tempResult != 0) {
                this.stack.push(this.tempResult, this.previousOperation, this.previousNumber);
                const result = this.getAnswer(this.stack);
                this.setTempResult(result);
            }
            this.clearCurrentNumber();
            return}
        // store prev number, push curent onto stack and operate on stack
        this.setPreviousNumber(this.currentNumber);
        this.stack.push(this.currentNumber);
        this.clearCurrentNumber();
        const result = this.getAnswer(this.stack);
        // set result as tempResult incase user wants to continue processing current sum
        this.setTempResult(result);
    }

    // recursively get answer
    getAnswer(stack) {
        if (stack.length < 3) {
            return stack[0];
        }
        if (stack.length === 3) {
            return this.operate(stack.shift(), stack.shift(), stack.shift());
        }
        
        const res = this.operate(stack.shift(), stack.shift(), stack.shift());
        stack = [res].concat(stack);
        
        return this.getAnswer(stack);
    }

    operate = (num1, operator, num2) => {
        switch (operator) {
            case '+': 
                return(parseInt(num1) + parseInt(num2));
            case '-': 
                return(num1 - num2);
            case '×':
                return(num1 * num2);
            case '÷':
                return(num1 / num2);
        }
    }
    
    doAdvancedOperation (operation) {
        // console.log(operation, this.currentNumber, this.tempResult, this.stack);
        var result = undefined;
        switch (operation) {
            case '+/-':
                if (this.currentNumber === 0) {
                    result = this.tempResult * -1;
                    break;
                }
                if (this.tempResult === 0) {
                    result = this.currentNumber * -1;
                    break;
                }
            case '%':
                alert("Under construction...")
                return;
                // if (this.previousOperation === undefined || this.currentNumber === 0) {return}
                // if (this.previousOperation === '×'){
                //     result = (this.previousNumber/100)*this.currentNumber;

                //     console.log(this.stack, this.previousNumber, this.previousOperation, this.currentNumber);
                //     break;
                // }
            case 'Sqr':
                if (this.currentNumber === 0) {
                    result = Math.sqrt(this.tempResult);
                    break;
                }
                if (this.tempResult === 0) {
                    result = Math.sqrt(this.currentNumber);
                    break;
                }
            case 'R.CM':
                alert("Under construction...")
                return;
            case 'M-':
                alert("Under construction...")
                return;
            case 'M+':
                alert("Under construction...")
                return;
        }
        // THis is run after the operation has been applied (currently only +/- operation)
        this.tempResult = result;
        this.currentNumber = result;
        this.updateDisplay(result)

    }

    clearCurrentNumber() {
        this.currentNumber = 0;
    }
    clearTempResult() {
        this.tempResult = 0;
    }
    clear() {
        this.clearCurrentNumber();
        this.stack = [];
        this.setTempResult(0);
        this.setPreviousNumber(undefined);
        this.setPreviousOperation(undefined);
        this.updateDisplay(0);
    }
    setPreviousOperation(operation) {
        this.previousOperation = operation;
    }
    setPreviousNumber(number) {
        this.previousNumber = number;
    }
    setTempResult(result) {
        this.tempResult = result;
        this.updateDisplay(result);
    }
}



// Page contents
const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const advancedOperations = document.querySelectorAll('[data-operation-adv]');
const equals = document.querySelectorAll('[data-equals]');
const clear = document.querySelectorAll('[data-clear]');
const display = document.querySelector('[data-display]');

const calculator = new Calculator(0);

// Event Listeners
// NUMBERS
numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
    })
})

// OPERATIONS
operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperation(button.textContent);
    })
})

// TO-DO: OPERATIONS-ADVANCED 
advancedOperations.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'Sqr'){return calculator.doAdvancedOperation('Sqr')};
        calculator.doAdvancedOperation(button.textContent);
    })
})

// EQUALS
equals.forEach(button => {
    button.addEventListener('click', () => {
        calculator.equals();
    })
})

// CLEAR
clear.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear();
    })
})

const calcOperations = ['+', '-', '/', '*']
window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (parseFloat(e.key)) {calculator.appendNumber(e.key);}
    if (e.key === '.') {calculator.appendNumber(e.key);}
    if (e.key === '0') {calculator.appendNumber(e.key);}
    if (e.key === 'Enter') {calculator.equals();}
    if (e.key === 'Backspace') {calculator.clear();}

    if (calcOperations.includes(e.key)) {
        if (e.key === '*') {return calculator.addOperation('×');}
        if (e.key === '/') {return calculator.addOperation('÷');}
        calculator.addOperation(e.key);}

})






















/*----------------------------------------------------------------
OLD CODE(2)
*/

/**
 * 
 class MemoryStack {
     
     constructor() {
         this.stack = [];
         this.currentNum = '';
        }
        
        push(value) {
            this.stack.push(value);
            if (Number.isInteger(parseInt(value))) {
                this.updateNumber();
            }
            else {
                this.stack.push(this.currentNum);
            }
        }
        // Removes from front(bottom) of stack
        shift(value) {
            this.stack.shift(value);
        }
        // Adds to front(bottom) of stack
        unshift(value) {
            this.stack.unshift(value);
        }
        // Adds single digits to current number 
        updateNumber() {
            while (this.stack.length > 0) {
                var value = this.stack.pop();
                if (calcFunctions.includes(value)) {
                    this.stack.push(value);
                    break;
                }
                this.currentNum += value; 
            }
            console.log(this.currentNum);
        }
        clearCurrentNum() {
            this.currentNum = '';
        }
    }
    
    var memoryStack = new MemoryStack();
    var displayStack = [];
    const calcFunctions = ['add', 'subtract', 'multiply', 'divide'];
    
    updateDisplay = () => {
        display = document.querySelector('.display');
        // console.log(displayStack);
        var tempStack = Array.from(displayStack);
        // If there's a zero on the display, replace with new number. else just add number onto display
        if (memoryStack.length < 2 || displayStack.length < 2) {  
            display.textContent = tempStack.pop();
        }
        else {
            display.textContent += tempStack.pop();
        }
    }
    clearDisplay = () => {
        display = document.querySelector('.display');
        display.textContent = '';
        // clearStack(displayStack);
    }
    holdDisplay = () => {
    var tempStack = Array.from(displayStack);
    var tempValue = '';
    while (tempStack.length > 0) {
        tempValue += tempStack.shift().toString();
    }
    document.querySelector('.display').textContent = tempValue;
}
clearMemory = () => {
    clearStack(memoryStack);
}
clearStack = (stack) => {
    while (stack.length > 0) {
        stack.pop();
    }
}


// Build the question(sequence e.g. 3+7/2 etc) that is worked out
buildSequence = () => {
    const sequence = [];
    var currentNum = 0;
    
    while (memoryStack.length > 0) {
        val = memoryStack.shift();
        
        if (calcFunctions.includes(val)) {
            sequence.push(parseInt(currentNum));
            sequence.push(val);
            currentNum = '';
        } else {
            currentNum += val;
        }
    }
    sequence.push(parseInt(currentNum));
    
    return getAnswer(sequence);
}


//Recursively Calculates each (num, operator, num) group/set/pair on the stack from the front.
//[1+2+3+4] -> [3+3+4] -> [6+4] -> [10] 

getAnswer = (sequence) => {
    if (sequence.length < 3) {
        return sequence[0];
    }
    if (sequence.length === 3) {
        return operate(sequence.shift(), sequence.shift(), sequence.shift());
    }
    
    var res = operate(sequence.shift(), sequence.shift(), sequence.shift());
    sequence = [res].concat(sequence);
    
    return getAnswer(sequence);
}


// Click event listeners on all buttons 
buttons = document.querySelectorAll('.btn')
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttonPressed(e.target.id);
    })
})



In Fact, Turn calc into class, so we can easily access current number..



// Main calculator logic
buttonPressed = (buttonId) => {
    // If buttonId is number
    if (buttonId >= 0 && buttonId <= 9) {
        memoryStack.push(buttonId);
        displayStack.push(buttonId);
        updateDisplay();
    } 
    
    // If buttonId is operation
    if (calcFunctions.includes(buttonId)) {
        memoryStack.push(buttonId);
        memoryStack.clearCurrentNum();
        
        console.log(memoryStack);
        
        holdDisplay();
        clearStack(displayStack);
    }
    
    
    
    if (buttonId === 'equals') { 
        ans = buildSequence();
        
        clearStack(displayStack);
        clearStack(memoryStack);
        
        displayStack.push(ans);
        memoryStack.push(ans);
        
        updateDisplay();
    }
    
    if (buttonId === 'clear') {
        clearStack(displayStack);
        clearStack(memoryStack);
        
        displayStack.push([0]);
        updateDisplay();
    }
    
    */
    
    // Darn it. this would work easier if we have the complete number on the stack
    // not single digits.. aggregate number onto string, then only push number onto stack
    // if operator/equal/any function button is pressed 
    
    // if (buttonId === '+-') {
        //     console.log(displayStack);
        //     /*
        //     Start popping from the stack until value popped is an operator or stack is empty.
        //     aggregate popped val into a number. multiply by negative one.
        //     push number back onto the stack.
        //     */
        //     // Get and aggregate current number from the stack    
        //     number = '';
        //     while (displayStack.length > 0) {
            //         val = displayStack.shift();
            //         if (calcFunctions.includes(val)) {
                //             displayStack.unshift(val);
                //             break;
                //         }
                //         number += val.toString();
                //     }
                
                //     // Add number back onto the stack with a negative/positive on the front digit
                //     for (var i = number.length -1; i >= 0; i--) {
                    //         if (i === 0) {
                        //             displayStack.unshift((parseInt(number[i]) * -1).toString());            
                        //         } else {
                            //             displayStack.unshift(number[i]);
                            //         }
                            //     }
                            
                            //     // update display
                            //     console.log(displayStack);
                            //     updateDisplay();
                            // }
                            // }
                            
                            
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           // displayValue = 0;
                           // operations = ['add', 'subtract', 'multiply', 'divide'];
                           // equationOperator = null;
                           // equationNum1 = 0;
                           // equationNum2 = 0;
                           // theresAnswer = false;
                           
                           
                           
                           
                           
                           // clearDisplay = () => {
                               //     display.textContent = ""
                               // }
                               
                               
                               
                               
                               
                               // displayThis = (value) => {
                                   //     if (theresAnswer) {
                                       //         display.textContent = value;
                                       //         displayValue = value;
                                       //         theresAnswer = false;
                                       //     }
                                       //     else {
                                           //         display.textContent += value;
                                           //         displayValue += value;
                                           //     }
//     console.log(displayValue);
