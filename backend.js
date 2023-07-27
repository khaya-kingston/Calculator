// Basic operate function
function operate(op, num1, num2) {

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

        case '^':
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

// hotkey keycode dictionary
const specialHotKeys = {'±':'negate', '%':'perc', '^':'exp',
                        '@':'root', 'Enter':'equals', '.':'point',
                        '+':'+', '*':'*', '-':'-', '/':'/',
                        'c':'clear', 'Backspace':'del'};

// Calculator Stack
let calc = ['0'];
disp.textContent = calc[calc.length - 1];

// Simplifies the calc stack with its existing operations
function simplify() {
    if (calc.length === 1) {
        return;
    } else {
        num2 = calc.pop();
        op = calc.pop();
        num1 = calc.pop();
        calc.push(operate(op, num1, num2));
    }
}

// Either concatenates or adds numbers to the calculator (or negates)
function numFiller(e) {
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

// Decides what to do with a number input
function numRunner(e) {
    calc[0] === '0' && upper.textContent === '' ? (() => {
    if (e.target.id != 'negate') {
        calc[0] = e.target.textContent; 
        disp.textContent = calc[0];
        upper.textContent = calc.join(' ');
    }
    })() : numFiller(e);
}


// Decides what to do with an operation input
function opRunner(e) {
    if (e.target.id === 'equals') {
        if (isNaN(Number(calc[calc.length - 1]))) {
            let popper = calc.pop();
        }
        upper.textContent = calc.join(' ');
        upper.textContent += ' =';
        simplify();
        disp.textContent = calc[0];
    } else if (e.target.id === 'perc') {
        if (isNaN(Number(calc[calc.length - 1]))) {
            let popper = calc.pop();
        } 
        calc[calc.length-1] = String(Number(calc[calc.length-1]/100));
        upper.textContent = calc.join(' ');
        disp.textContent = calc[-1];
    } else if (e.target.id === 'root') {
        if (isNaN(Number(calc[calc.length - 1]))) {
            let popper = calc.pop();
        } 
        calc[calc.length-1] = String(Number(calc[calc.length-1]**0.5));
        upper.textContent = calc.join(' ');
        disp.textContent = calc[-1];
    }
    else {
        let toAdd = e.target.textContent;
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

// Decides what to do with a del-clear input
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

// Handles where to send an input based on button
function buttonPress(e) {
    e.target.classList[0] === "del-clear" ? powRunner(e) : (() => {
        e.target.classList[0] === "num-arg" ? numRunner(e) : opRunner(e);
    })()
}

// Extracts the buttons on the calc and adds the click event listeners
const buttons = document.getElementsByTagName('button');

buttonsArr = [...buttons]

buttonsArr.forEach(button => {
    button.addEventListener('click', buttonPress);
});


// Basically just checks if the key you pressed is mappable to a button
// And if so it activates it
document.addEventListener('keydown', (e) => {
    let currButton = null;
    if (e.key in specialHotKeys) {
        currButton = document.getElementById(specialHotKeys[e.key]);
        currButton.click();
    } else if (e.key >= '0' && e.key <= '9') {
        currButton = document.getElementById(e.key);
        currButton.click();
    } 
})

