function calculateSum(a, b, callback) {
    let sum = a + b;
    callback(sum);
}

function displaySum(sum) {
    console.log(`Tổng của hai số là: ${sum}`);
}
calculateSum(3, 4, displaySum);