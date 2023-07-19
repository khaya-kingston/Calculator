// Basic operate function
function operate(op, num1, num2) {

    switch (op) {
        case '+':
            return String(Number(num1)+Number(num2));
            break;

        case '-':
            return String(Number(num1)-Number(num2));
            break;

        case '*':
            return String(Number(num1)*Number(num2));
            break;
        
        case '/':
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
const ops = ['+', '-', '*', '/', 'exp', 'sqrt', '!'];


// Calculator Stack
const calc = [];


// Errors
const errors = {
    intError : "Error: Must Start With Num",
    opError : "Error: Can't Concat Operations",
    ptError : "Error: Number Has 2 Points",
    negError : "Error: Can't Negate Nothing"
}

// Boolean for checking decimal nature
let isDec = false;


// Simplifies calc stack 
function simplify() {
    if (calc.length == 3) {
        const num1 = calc.shift();
        const op = calc.shift();
        const num2 = calc.shift();
        calc.unshift(operate(op, num1, num2));
    }
}

// Clear everything
function clear() {
    calc = [];
    upper.textContent = '';
    disp.textContent = '';
}

// Functions concerning pressing a num button


// Function for when the calculator is empty
function starter(e) {

    switch (e.id) {
        case 'point': 
            disp.textContent = '0.';
            isDec = true;
            calc.push(disp.textContent);
            break;
            
        case 'negate':
            disp.textContent = errors.negError;
            break;

        default:
            calc.push(e.textContent);
            disp = calc[-1];
    }
}

console.log(Number('.'));

// Function for adding points
function pointer() {
    isDec ? () => {
        clear();
        disp.textContent = errors.ptError;
    } : () => {
        isDec = true;
        calc[-1] += '.';
        disp.textContent = calc[-1];
    };
}

// Function for concatenating numbers
function numFiller(e) {
    if (e.id === 'point') {
        if (calc[-1] in ops) {
            calc.push('0');
        } 
        pointer();
    } else {
        if (calc[-1] in ops) {
            calc.push(e.textContent);
            upper = calc.join('');
            disp = calc[-1];
        } else {
            if (e.id === 'negate') {
                calc[-1] = '-'+calc[-1];
                disp = calc[-1];
            } else {
                calc[-1] += e.textContent;
                disp = calc[-1];
            }
        }
    }
}



function numRunner(e) {
    calc.length == 0 ? starter(e) : numFiller(e);
}