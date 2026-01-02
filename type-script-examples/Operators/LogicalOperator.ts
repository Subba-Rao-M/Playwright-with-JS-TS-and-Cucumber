/**
 * Works on boolean values and returns a boolean value true or false.
 * Logical Operators: && (AND), || (OR), ! (NOT)
 * 
 * 
 */

let p: boolean = true;
let q: boolean = false;
console.log("p && q :", p && q); // Output: false
console.log("p || q :", p || q); // Output: true        
console.log("!p :", !p);         // Output: false
console.log("!q :", !q);         // Output: true 

console.log("(p && q) || (!p) :", (p && q) || (!p)); // Output: false
console.log("(p || q) && (!q) :", (p || q) && (!q)); // Output: true   
console.log("!(p && q) :", !(p && q)); // Output: true
console.log("!(p || q) :", !(p || q)); // Output: false 

// Combining multiple logical operators 
let r: boolean = true;  
console.log("(p && q) || (r && !q) :", (p && q) || (r && !q)); // Output: true
console.log("!(p || q) && (r || p) :", !(p || q) && (r || p)); // Output: false

//Combination of relational and logical operators
// Example with non-boolean values
let numA: number = 5;
let numB: number = 10;      
console.log("(numA < numB) && (numA > 0) :", (numA < numB) && (numA > 0)); // Output: true      
console.log("(numA > numB) || (numB > 0) :", (numA > numB) || (numB > 0)); // Output: true
console.log("!(numA === numB) :", !(numA === numB)); // Output: true   
console.log("!(numA < numB) :", !(numA < numB)); // Output: false