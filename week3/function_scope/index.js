// var example = 5

// const test = () => {
//     var testVariable = 10;
//     console.log(example);
//     console.log(testVariable);
// }

// test()
// console.log(example);


// console.log(`Before: ${example}`);

// let example = 10;

// console.log(`After: ${example}`);


var globalVariable = 10


const changeGlobal = () => {
    globalVariable = 50;
    
    let scopeVariable = 5;
    console.log(`scopeVariable ${scopeVariable}`);

    const constantVariable = 10;
    console.log(`constantVariable ${constantVariable}`);

}

console.log(`Global variable before: ${globalVariable}`)
changeGlobal();

console.log(`Global variable after: ${globalVariable}`)