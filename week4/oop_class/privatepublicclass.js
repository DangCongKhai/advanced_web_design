class MyClass {
    #x = 0;

    #incX() {
        this.#x++;
        console.log(this.#x);
    }

    #setX(x) {
        this.#x = x;
    }

    get #getX() {
        return this.#x;
    }

    incrementValueOfX() {
        this.#incX();
    }

    changeValueOfX(x) {
        this.#setX(x);
    }

    displayValueOfX() {
        return this.#getX;
    }
}

const m = new MyClass();

console.log(`Value of x before change is: ${m.displayValueOfX()}`);
m.incrementValueOfX();
console.log(`Value of x after change is: ${m.displayValueOfX()}`);
console.log("Change value of x to 10");
m.changeValueOfX(10);
console.log(`Value of x after change is: ${m.displayValueOfX()}`);



