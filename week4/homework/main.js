class Shape {
    // Abstract class shape
    constructor() {
        if (this.constructor === Shape) {
            throw new Error("People is an abstract class and cannot be instantiated directly.");
        }
    }

    // Abstract method
    getArea() {
        throw new Error("getArea method must be implemented");
    }

    displayInfo() {
        throw new Error("displayInfo method must be implemented");
    }
}


class Square extends Shape{
    constructor(side) {
        super();
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }

    displayInfo() {
        console.log(`Square: Side = ${this.side}`);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    displayInfo() {
        console.log(`Circle: Radius = ${this.radius}`);
    }
}

// const shape = new Shape() # Error because it is an abstract class, cannot be instantiated directly

const square = new Square(5);
const circle = new Circle(5);

square.displayInfo();
circle.displayInfo();

const squareArea = square.getArea();
const circleArea = circle.getArea();

console.log("Square area with side = 5: ", squareArea);
console.log("Circle area with radius = 5: ", circleArea);
