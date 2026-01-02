/**
 * Funciton is a block of code desinged to perform a particular task and which can be reused in a program.
 * Different types of functions in TypeScript:
 * 1. Named Functions
 * 2. Anonymous Functions or nameless functions
 * 3. Arrow Functions or Lambda Functions
 * * 
 * Named Functions: A named function is a function that has a specific name assigned to it.
 * It can be called by its name to execute the code block defined within it.
 * Syntax   :
 * function functionName(parameters): returnType {
 *      // function body
 * }
 * 
 * functionName(arguments);
 * 
 * Parameters: A function can have zero or more parameters. Parameters are variables that are passed to the function when it is called.
 * Return Type: A function can return a value of a specific type. The return type is specified after the parameters in the function declaration.
 *
 */

//1. Named Function without parameters and without  return type
function greet(): void {
    console.log("Hello, welcome to TypeScript Functions!");
}

greet(); // Calling the function else above function will not execute

//Methods can be accessed using object of class and function can be accessed directly using function name

//2. Named Function with parameters and with return type
function addNumbers(a: number, b: number): number {
    return a + b;
}

let sum: number = addNumbers(5, 10);
console.log("Sum:", sum);


//3. Named Function with parameters and without return type
function printMessage(message: string): void {
    console.log("Message:", message);
}

printMessage("This is a TypeScript function demo.");

//4. Named Function without parameters and with return type
function getCurrentDate(): string {
    return new Date().toDateString();
}  

let currentDate: string = getCurrentDate();
console.log("Current Date:", currentDate);




