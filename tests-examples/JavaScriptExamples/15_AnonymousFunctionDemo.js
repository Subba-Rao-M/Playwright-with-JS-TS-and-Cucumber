/**
 * What is an Anonymous Function?
 * An anonymous function is a function that is defined without a name.
 * Anonymous functions are often used as arguments to other functions,
 * or as immediately invoked function expressions (IIFE).
 * 
 * Example: Syntax of Anonymous Function and its implementation
 */

function sayHello() {
    return "Hello, World!";
}

const hello_message = sayHello(); // Output: Hello, World!
console.log(hello_message);

// Anonymous Function Example
const greet = function(name) {
    return "Hello, " + name + "!";
}
const greeting_message = greet("Alice"); // Output: Hello, Alice!
console.log(greeting_message);