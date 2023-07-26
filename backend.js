// Basic operate function
function operate(op, num1, num2) {

    console.log('operator Called');

    switch (op) {
        case '+':
            return String(Number(num1)+Number(num2));
            break;

        case '−':
            return String(Number(num1)-Number(num2));
            break;

        case '×':
            return String(Number(num1)*Number(num2));
            break;
        
        case '÷':
            return String(Number(num1)/Number(num2));
            break;

        case 'exp':
            return String(Number(num1)**Number(num2));
            break;

        default:
            return 'ERROR';
    
    }
}

// Screen objects
const screen = document.querySelector('#screen');
const upper = screen.querySelector('#work-holder')
const disp = screen.querySelector('#result-display');

// Operation List
const ops = ['+', '-', '*', '/', 'exp', 'sqrt', 'fact'];


// Calculator Stack
let calc = ['0'];
disp.textContent = calc[calc.length - 1];


// Errors
const errors = {
    intError : "Error: Must Start With Num",
    opError : "Error: Can't Concat Operations",
    ptError : "Error: Number Has 2 Points",
    negError : "Error: Can't Negate Nothing"
}

// Boolean for checking decimal nature
let isDec = false;

function simplify() {
    console.log('simplify Called');
    if (calc.length === 1) {
        return;
    } else {
        num2 = calc.pop();
        op = calc.pop();
        num1 = calc.pop();
        calc.push(operate(op, num1, num2));
    }
}

function numFiller(e) {
    console.log('numFiller Called');
    if (e.target.id != 'negate') {
        isNaN(Number(calc[calc.length - 1])) ? calc.push(e.target.textContent) : 
        calc[calc.length - 1] += e.target.textContent;
    } else {
        if (!(isNaN(Number(calc[calc.length - 1])))) {
            calc[calc.length-1] = String(Number(calc[calc.length-1]) * -1);
        }
    }
    disp.textContent = calc[calc.length - 1];
    upper.textContent = calc.join(' ');
}

function numRunner(e) {
    console.log('numRunner Called');
    calc[0] === '0' && upper.textContent === '' ? (() => {
    if (e.target.id != 'negate') {
        calc[0] = e.target.textContent; 
        disp.textContent = calc[0];
        upper.textContent = calc.join(' ');
    }
    })() : numFiller(e);
}

function opRunner(e) {
    console.log('opRunner Called');
    if (e.target.id === 'equals') {
        if (isNaN(Number(calc[calc.length - 1]))) {
            let popper = calc.pop();
        }
        upper.textContent = calc.join(' ');
        upper.textContent += ' =';
        simplify();
        disp.textContent = calc[0];
    }
    else {
        isNaN(Number(calc[calc.length - 1])) ? (() => {
            calc[calc.length - 1] = e.target.textContent;
        })() : (() => {
            simplify();
            calc.push(e.target.textContent);
            disp.textContent = calc[0];
        })();
        upper.textContent = calc.join(' ');
    }
}

function powRunner(e) {
    
    if (e.target.textContent === 'AC') {
        disp.textContent = '0';
        upper.textContent = '';
        calc = ['0'];
    } else {
        if (disp.textContent != 0) {
            let popper = calc.pop();
            if (popper.length === 1) {
                disp.textContent = '0';
            } else {
                disp.textContent = popper.slice(0, popper.length-1);
                calc.push(popper.slice(0, popper.length-1));
            }
        upper.textContent = calc.join(' ');
        } 
    }

}


function buttonPress(e) {
    console.log('Button Pressed');
    e.target.classList[0] === "del-clear" ? powRunner(e) : (() => {
        e.target.classList[0] === "num-arg" ? numRunner(e) : opRunner(e);
    })()
}

const buttons = document.getElementsByTagName('button');

buttonsArr = [...buttons]

buttonsArr.forEach(button => {
    button.addEventListener('click', buttonPress);
});

console.log(calc);
console.log(disp);
console.log(upper);
console.log(isDec);