let a: number = 10, b: number = 2;

console.log("Addition:", a + b); // Addition: 12
console.log("Subtraction:", a - b); // Subtraction: 8   
console.log("Multiplication:", a * b); // Multiplication: 20
console.log("Division:", a / b); // Division: 5
console.log("Modulus:", a % b); // Modulus: 0
console.log("Exponentiation:", 7 ** 3); // Exponentiation: 343 

// Demonstrating operator precedence
let result: number = a + b * 2; // Multiplication has higher precedence than addition
console.log("Result of a + b * 2:", result); // Result of a + b * 2: 16 