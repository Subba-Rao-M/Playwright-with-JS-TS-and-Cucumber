/*
Hoisting is JavaScript's default behavior of moving declarations to the top.
In TypeScript, variables declared with var are hoisted, meaning their declarations are moved to the top of their enclosing scope (function or global) during the compilation phase. However, only the declaration is hoisted, not the initialization. This can lead to unexpected behavior if a variable is used before it is initialized.

Variables declared with let and const are also hoisted, but they are not initialized. They remain in a "temporal dead zone" from the start of the block until the declaration is encountered. Accessing them before the declaration results in a ReferenceError.    
*/

//console.log(a); //undefined
var a = 10; // Output: undefined due to hoisting of declaration only
console.log(a); // Output: 10


//console.log(b); //Cannot access 'b' before initialization
let b = 10; 
console.log(b); 

//console.log(c); //Cannot access 'c' before initialization // execution comes to this step if above b is commented
const c = 20; 
console.log(c);