
// function equalsTotal() {
//     results[0].style.cssText = `
//     font-size=60px;
//     color:red
//     `;
//     calculatorContainer.addEventListener('click', () => {
//         results[0].style.cssText = `
//     font-size=10px;
//     color:blue
//     `
//     })
// }






//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~variables
const log = (log) => console.log(log)
const div = document.querySelectorAll('div')
const calculatorContainer = document.querySelector('#calculator-container')
const numContainer = document.querySelector('#calculator-numbers')
const historyContainer = document.querySelector('#calculator-history')
const num = document.querySelectorAll('.numbers');
const arith = document.querySelectorAll('.calculations')
const decimal = document.querySelector('.decimal')
const results = document.querySelectorAll('.results')
const equals = document.querySelector('.equals')
const subtract = document.querySelector('.subtract')
const history = document.querySelector('.history')
const back = document.querySelector('.back')
const clear = document.querySelector('.clear')
const homeBtn = document.querySelector('.home')
const themeBtn = document.querySelector('.theme')

const historyBlocks = document.querySelectorAll('.history-blocks')
const alternateSizeView= window.matchMedia("(min-width:720px)")
let backstring;
let answerSaved = []
let equationSaved = []
let historyStorage = []
let equation = '';
let equationwithpercent;
let answer = 0
let answerTemp;
results[0].innerText = equation;
results[1].innerText = answer;
getLocalStorage();
console.log(themeBtn)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~functions

    function equalsTotal() {
    results[1].style.cssText = `
    font-size:2em;
    color:var(--totalcolor);
     
    border-radius:10px 0 0 10px;
    align-items:center;  
    `;
    
    setTimeout(()=>{ calculatorContainer.addEventListener('click',()=>results[1].style.cssText = `background-color:var(--gradient1);`,{once:true})},500) 
}

function mediaScreenSize(minScreen) {
    if (minScreen.matches) {
        alternateSizeHistory()
    }
    else { showMainCalculator() }
}

function answerFormulas(){
    if (/%/.test(equation)){ 
equationwithpercent = equation.replace(/%/g,'/100');
   answer = Function("return " + equationwithpercent)();
    results[1].innerText = answer}
        else {answer = Function("return " + equation)();
        //if (/[0-9%]/.test(equation.charAt(equation.length -1))){results[1].innerText = answer}
        if (/[0-9%]$/.test(equation)){results[1].innerText = answer}}
}


function getLocalStorage() {
    if (localStorage.getItem('equationHistory') != '' && localStorage.getItem('equationHistory') != null){
         equationSaved = localStorage.getItem('equationHistory').split(',') }
    if (localStorage.getItem('answerHistory') != '' && localStorage.getItem('answerHistory') != null){
         answerSaved = localStorage.getItem('answerHistory').split(',') }
}

function showMainCalculator(){
    numContainer.style.display = 'flex';
    historyContainer.style.display = 'none';
    history.style.display = 'flex';
    homeBtn.style.display = 'none'}


function displayHistory() {
    numContainer.style.display = 'none';
    historyContainer.style.display = 'flex';
    history.style.display = 'none';
    homeBtn.style.display = 'flex'
    for (let i = 0; i < 10; i++) {
        if (equationSaved[equationSaved.length - i - 1] != undefined) {
            historyBlocks[i].innerText = equationSaved[equationSaved.length - i - 1] + ' = ' + answerSaved[answerSaved.length - i - 1];
            historyBlocks[i].style.display = 'flex';
            log(equationSaved[equationSaved.length - 1]);
        }
        else { historyBlocks[i].style.display = 'none' }
    }
}
function alternateSizeHistory() {
    
    historyContainer.style.display = 'flex';
    history.style.display = 'none';
    
    for (let i = 0; i < 10; i++) {
        if (equationSaved[equationSaved.length - i - 1] != undefined) {
            historyBlocks[i].innerText = equationSaved[equationSaved.length - i - 1] + ' = ' + answerSaved[answerSaved.length - i - 1];
            historyBlocks[i].style.display = 'flex';
           
        }
        else { historyBlocks[i].style.display = 'none' }
    }
}


    

function deleteLastInput() {
    backstring = equation.split(''); backstring.splice(-1);
    equation = backstring.join('');
    results[0].innerText = equation;
    if (/[0-9%]$/.test(equation)) { answerFormulas(); }
    else {
        if (/%/.test(equation)) {
            answerTemp = equation.split(''); answerTemp.splice(-1); equationwithpercent = answerTemp.join('');
        }
        else {
            answerTemp = equation.split(''); answerTemp.splice(-1); answer = answerTemp.join('');
        }
    }

    if (/[^0-9.]/.test(answer) == true) { results[1].innerText = Function("return " + answer)() }
    else results[1].innerText = answer;
}



function numberInputs() {
    for (let i = 0; i < num.length; i++) {
        num[i].addEventListener('click', () => {
            
            if (num[i].innerText == '=' && /[^0-9]/.test(equation) == true) {
                equalsTotal()
                //if (equationSaved[equationSaved.length - 1] != equation && equation.charAt(equation.length - 1).match(/[0-9%]/) != null)
                if (equationSaved[equationSaved.length - 1] != equation && /[0-9%]$/.test(equation)) {
                    log('pushed data'); answerSaved.push(answer); equationSaved.push(equation);
                    if (answerSaved[10] != undefined) { answerSaved.shift() }
                    if (equationSaved[10] != undefined) { equationSaved.shift() }
                    localStorage.setItem('equationHistory', equationSaved.join(','));
                    localStorage.setItem('answerHistory', answerSaved.join(','));
                    
                    if (alternateSizeView.matches){alternateSizeHistory();}
                }
            }
            else if (num[i].innerText == '.' && equation.charAt(equation.length - 1) != '.' && decimalOrder(equation) == true)
             { equation += num[i].innerText; results[0].innerText = equation; }
            //else if (num[i].innerText.match(/[0-9]/) != null)
            else if (/[0-9]/.test(num[i].innerText)) {
                equation += num[i].innerText;
                results[0].innerText = equation;
                answerFormulas()
            }
        })
    }
}




function arithInputs() {
    for (let i = 0; i < arith.length; i++) {
        arith[i].addEventListener('click', () => {

            if (/[^0-9]/.test(arith[i].innerText) == true && /[^0-9%]/.test(equation[equation.length - 1]) == true) {
                equation = equation.replace(/[^0-9%]+$/, arith[i].innerText); results[0].innerText = equation
            }
            if (arith[i].innerText == '-' && equation == '') {
                 equation = arith[i].innerText; results[0].innerText = equation; 
                }
            //else if (arith[i].innerText == '-' && equation.charAt(equation.length - 1).includes('-') == false) { equation[-1] += arith[i].innerText; results[0].innerText = equation; }
            else if (arith[i].innerText == '-' && /-$/.test(equation) == false) {
                equation[-1] += arith[i].innerText; results[0].innerText = equation;
            }
            //if (/[0-9%]/.test(equation.charAt(equation.length -1))) 
            if (/[0-9%]$/.test(equation)) {
                if (arith[i].innerText != '%') {
                    equation += arith[i].innerText;
                }
                else if (arith[i].innerText == '%' && /%$/.test(equation) == false) {
                    equation += arith[i].innerText;
                }
                results[0].innerText = equation;
                ///%/.test(equation.charAt(equation.length -1)) ? answerFormulas(): null
                /%$/.test(equation) ? answerFormulas() : null
            }


        })
    }
}              



function decimalOrder(string) {
    let indexSymbol;
    let indexDecimal;

    for (let i = 0; i < string.length; i++) {

        if (/[^0-9|.]/.test(string[i]) == true) {
            indexSymbol = i
        }
        else if (string[i] == '.') { indexDecimal = i }
    }
    if (indexDecimal < indexSymbol || indexDecimal == undefined) { return true }
    else return false
}


//~~~~~~ calculator build
mediaScreenSize(alternateSizeView)
addEventListener('resize', () => mediaScreenSize(alternateSizeView))
numberInputs();
arithInputs();
clear.addEventListener('click', () => { equation = ''; results[0].innerText = equation; results[1].innerText = ''; })
back.addEventListener('click', deleteLastInput)
history.addEventListener('click',displayHistory)
historyBlocks.forEach((a) => a.addEventListener('click', () => {
    let equationArray = a.innerText.split(' ');
    equation = equationArray[0];
    results[0].innerText = equation
    answerFormulas()
    if(alternateSizeView){
    alternateSizeHistory()
    }
    else{showMainCalculator() }
    }))
homeBtn.addEventListener('click',showMainCalculator)
themeBtn.addEventListener('click', () => {

    if (document.documentElement.className == 'light') {
        document.documentElement.className = 'dark';
        themeBtn.innerText="Dark Theme"
    }
    else{ document.documentElement.className = 'light';
    themeBtn.innerText="Light Theme" }
}


)


// function setTheme(){

//     if (document.documentElement.className == 'light') {
//         document.documentElement.className = 'dark'
//     }
//     else{ document.documentElement.className = 'light' }
// }