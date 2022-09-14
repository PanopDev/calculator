/*
one
two
three
four
five
six
seven
eight
nine
zero
*/
const log = (log) => console.log(log)
const div = document.querySelectorAll('div')
const numContainer = document.querySelector('#calculator-numbers')
const historyContainer = document.querySelector('#calculator-history')
const num = document.querySelectorAll('.numbers');
const arith = document.querySelectorAll('.calculations')
const results = document.querySelectorAll('.results')
const equals = document.querySelector('.equals')
const subtract = document.querySelector('.subtract')
const history = document.querySelector('.history')
const back = document.querySelector('.back')
const clear = document.querySelector('.clear')
const homeBtn = document.querySelector('.home')
const historyBlocks = document.querySelectorAll ('.history-blocks')
let backstring;

let answerSaved = [];
let equationSaved = [];
let equation = '';
let answer = 0


results[1].innerText = equation;
results[0].innerText = answer;

for (let i = 0; i < num.length; i++) {

    num[i].addEventListener('click', () => {

        if (num[i].innerText == '=') {
            if (equationSaved[equationSaved.length - 1] != equation && equation.charAt(equation.length - 1).match(/[0-9]/) != null) { log('pushed data'); answerSaved.push(answer); equationSaved.push(equation) }


        }
        else if (num[i].innerText == '.' && equation.charAt(equation.length - 1) != '.') { equation += num[i].innerText; results[1].innerText = equation; }
        else if (num[i].innerText.match(/[0-9]/) != null) { equation += num[i].innerText; results[1].innerText = equation; answer = Function("return " + equation)(); results[0].innerText = answer; }
    })
}

for (let i = 0; i < arith.length; i++) {

    arith[i].addEventListener('click', () => {
        if (arith[i].innerText == '-' && equation.charAt(equation.length - 1).includes('-') == false) { equation += arith[i].innerText; results[1].innerText = equation; }
        else if (equation.charAt(equation.length - 1).match(/[0-9]/) != null) { equation += arith[i].innerText; results[1].innerText = equation; }
    })

}

clear.addEventListener('click', () => { equation = ''; results[1].innerText = equation; })
back.addEventListener('click', () => { backstring = equation.split(''); backstring.splice(-1); equation = backstring.join(''); results[1].innerText = equation; if (equation.charAt(equation.length - 1).match(/[0-9]/) != null) { answer = Function("return " + equation)(); } results[0].innerText = answer; console.log(backstring.join('')) })
history.addEventListener('click', ()=> {numContainer.style.display = 'none'; historyContainer.style.display = 'flex'; history.style.display='none'; homeBtn.style.display = 'flex'
for(let i=0; i<10; i++)
{   
    if(equationSaved[equationSaved.length -i-1] != undefined){
    historyBlocks[i].innerText= equationSaved[equationSaved.length -i-1] + ' = ' + answerSaved[answerSaved.length -i-1]; historyBlocks[i].style.display='flex'
    log(equationSaved[equationSaved.length])}
        else {historyBlocks[i].style.display='none'}
}

})
homeBtn.addEventListener('click', ()=> {numContainer.style.display = 'flex'; historyContainer.style.display = 'none'; history.style.display='flex'; homeBtn.style.display = 'none'})


// for(let i=1; i<11; i++)
// {   
//     historyBlocks[0].innerText= equationSaved[equationSaved.length - (i-1)] + ' ' + answerSaved[answerSaved.length - (i -1)]
//     log(equationSaved[equationSaved.length])
// }

log('heyyyy muthhaaa')


