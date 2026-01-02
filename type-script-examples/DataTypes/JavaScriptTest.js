/*
Java script is a dynamically typed language, which means you don't need to declare variable types explicitly.
However, TypeScript is a superset of JavaScript that adds static typing to the language.
In TypeScript, you can declare variable types explicitly to take advantage of type checking and improved code clarity.
*/

let age = 30;


console.log("Age:", age); // Output: Age: thirty
console.log("Type of age:", typeof age); // Output: Type of age: number

// Reassigning a different type to the same variable

age = "thirty"; // No error in JavaScript as it is dynamically typed
console.log("Updated Age:", age); // Output: Updated Age: thirty
console.log("Type of updated age:", typeof age); // Output: Type of updated age: string

/** Type safety */

let message = "Hello, TypeScript!";
let number = 30;
message = 100;
number = "Thirty";

let resutlt = " Test " + 30;
console.log(resutlt);