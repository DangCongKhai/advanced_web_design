function checkEvenOdd(number, callback) {
    if (number % 2 === 0) {
        callback(number, 'Even');
    } else {
        callback(number, 'Odd');
    }
}

function displayResult(number, result) {
    console.log(`${number} is ${result}`);
}

checkEvenOdd(10, displayResult);
checkEvenOdd(11, displayResult);