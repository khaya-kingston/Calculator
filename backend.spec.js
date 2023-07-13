


// Basic operate function
function operate(op, num1, num2) {

    let result;
    
    switch (op) {
        case '+':
            result = String(Number(num1)+Number(num2));
            break;

        case '-':
            result = String(Number(num1)-Number(num2));
            break;

        case '*':
            result = String(Number(num1)*Number(num2));
            break;
        
        case '/':
            result = String(Number(num1)/Number(num2));
            break;

        default:
            result = 'ERROR';

    return result;

    }



}