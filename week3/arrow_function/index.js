// const hello = (name, message) => {
//   console.log("Hello " + name + ", " + message);
// }


// hello("John", "Welcome to the world of JavaScript!");


const hello2 = () => {
    console.log("Hello World!");
}


var hello = (name, message) => {
    return `${message}, ${name}!`;
}

console.log(hello("John", "Welcome to the world of JavaScript!"));


const isEven = (number) => number % 2 === 0;

console.log(isEven(4)); // true
console.log(isEven(5)); // false


const sumFromOneToTen = () => {
    let sum = 0;
    let sumOdd = 0;
    let sumEven = 0;
    for (let i = 1; i <= 10; i++) {
        if (isEven(i)) {
            sumEven += i;
        } else {
            sumOdd += i;
        }
        sum += i;
    }
    return { sum, sumOdd, sumEven };
}


const result = sumFromOneToTen();
console.log(`Sum from 1 to 10: ${result.sum}`);
console.log(`Sum of odd numbers from 1 to 10: ${result.sumOdd}`);
console.log(`Sum of even numbers from 1 to 10: ${result.sumEven}`);


var [greeting,,,,,name] = ["Hello", "World", "!", "Bai", "bai", "John"];
console.log(`${greeting}, ${name}!`); // Output: Hello, John!