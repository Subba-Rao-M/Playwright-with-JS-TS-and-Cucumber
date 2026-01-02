/**
 * Relational Operator : returns a boolean value true or false after comparison between two values.
 * > < >= <= == === != !==  
 * === is available only in typescript  called strict equal to which checks both value and type.
 */

let a:number=10, b: number=20;

console.log("a > b :", a > b);   // Output: false
console.log("a < b :", a < b);   // Output: true
console.log("a >= b :", a >= b); // Output: false
console.log("a <= b :", a <= b); // Output: true
console.log("a == b :", a == b); // Output: false
console.log("a === b :", a === b); // Output: false
console.log("a != b :", a != b); // Output: true
console.log("a !== b :", a !== b); // Output: true

//Difference between == and ===
b=a;

console.log("After assigning b = a");   
console.log("a == b :", a == b);    // Output: true
console.log("a === b :", a === b);  // Output: true

let c: any = "10";
console.log("a == c :", a == c);    // Output: true (value comparison only)
console.log("a === c :", a === c);  // Output: false (value and type comparison)

let num1: any = 5;
let num2: any = "5";

console.log("num1 == num2 :", num1 == num2);   // Output: true (value comparison only)
console.log("num1 === num2 :", num1 === num2); // Output: false (value and type comparison)

num2 = 5;   
console.log("After assigning num2 = 5");
console.log("num1 == num2 :", num1 == num2);    // Output: true (value comparison only)
console.log("num1 === num2 :", num1 === num2);  // Output: true (value and type comparison)