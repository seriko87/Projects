const btns = document.querySelectorAll('.num');
const operations = document.querySelectorAll('.action');
const pozitiveNegative = document.querySelector('.negative');
const clearAll = document.querySelector('.clear');
let display = document.querySelector('.calculatorDisplay');
const btnDecimal =  document.querySelector('.decimal');
const equal = document.querySelector('.equals');
let negPozCheck = true;
let enteredNumList = [] // I used arayy for temporary storing entered data
let firstNumber = 0;
let secondNumber = 0;
let operant = '';
let result = 0;
let decimalStatus = false;

//button numbers cheking inner html and updating display
btns.forEach(btn => {
    btn.addEventListener('click', function(){
        enteredNumList.push(this.innerHTML);
        updateDisplay();  
    })
})

/* for operations i cheked the innerHtml if it match
needed operation then i did pass firstNumber to secondNumber and 
set operant value to that operation so i can use it for equal*/
operations.forEach(operation =>{
    operation.addEventListener('click', function(){
        switch(true) {
            case this.innerHTML === 'x':
                secondNumber = firstNumber;
                operant = '*';
            break;
            case this.innerHTML === '÷':
                secondNumber = firstNumber;
                operant = '÷';
            break;
            case this.innerHTML === '%':
                secondNumber = firstNumber;
                operant = '%';
            break;
            case this.innerHTML === '+':
                secondNumber = firstNumber;
                operant = '+';
            break;
            case this.innerHTML === '-':
                secondNumber = firstNumber;
                operant = '-';
            break;
          } 
        firstNumber = 0;
        enteredNumList = [];
        negPozCheck = true;
        decimalStatus = false;   
    })
});

// I did check operant and did calculation based on that operant
equal.addEventListener('click', function(){
    switch(true) {
        case operant === '*':
            result = firstNumber * secondNumber;
            display.innerHTML = result;
          break;
        case operant === '÷':
            result = secondNumber / firstNumber;
            display.innerHTML = result;
          break;
        case operant === '+':
            result = firstNumber + secondNumber;
            display.innerHTML = result;
          break;
        case operant === '-':
            result = secondNumber - firstNumber;
            display.innerHTML = result;
          break;
        case operant === '%':
            result =  secondNumber % firstNumber;
            display.innerHTML = result;
          break;
    }
    enteredNumList = [];
})

//update display
function updateDisplay(){
    if(negPozCheck){ //here i first checked negPoz variable if it true it means pozitive
        if (decimalStatus) {  // here i checked decimal so if true i can parseFloat
            firstNumber = parseFloat(enteredNumListJoin());
        } else {
            firstNumber = parseInt(enteredNumListJoin());
        }
    } else { // if false it means negative and I added minus to the number
        if (decimalStatus) {
            firstNumber = -(parseFloat(enteredNumListJoin()));
        } else {
            firstNumber = -(parseInt(enteredNumListJoin()));
        }
    }
    display.innerHTML = firstNumber;
}

//joining array numbers
function enteredNumListJoin(){
    return enteredNumList.join('');
}

//clear display, firstNumber, secondNumber, assign negpozcheck to true and decimal false,
function clearDisplay (){
    enteredNumList = [];
    firstNumber = 0;
    secondNumber = 0;
    display.innerHTML = '';
    negPozCheck = true;
    decimalStatus = false;
}

clearAll.addEventListener('click', function(){
    clearDisplay();
})

//positive negative  check and I assigned result to negPozCheck variable.
pozitiveNegative.addEventListener('click', function(){
    negPozCheck = !negPozCheck;
    updateDisplay();
});


// added decimals to array and if it is added before i didnt add second one
btnDecimal.addEventListener('click', function(){
    if (!decimalStatus){
        enteredNumList.push('.');
        decimalStatus = true;
        updateDisplay();
    } 
})

