/**
 * Increment Operator ++

The increment operator (++) is used to increase the value of a variable by 1. It can be used in two forms: 
1. Prefix form (++variable): Increments the value before it is used in an expression.
2. Postfix form (variable++): Increments the value after it is used in an expression.

Output is same for both but when the value is assigned to another variable the difference is seen.

    *  Postfix Example
    let a: number = 5;
    let b: number = a++; // b is assigned 5, then a becomes 6

Decrement Operator --

The decrement operator (--) is used to decrease the value of a variable by 1. It can also be used in two forms:
1. Prefix form (--variable): Decrements the value before it is used in an expression.
2. Postfix form (variable--): Decrements the value after it is used in an expression.
 * 
 * 
 */

let x1: number = 5;
x1++; //x = x+1 // Postfix increment first specify variable then increment
console.log(x1); // Output: 6


++x1; // x= x+1 prefix increment first increment then specify variable 
console.log(x1); // Output: 7

x1=5;  //   Resetting x1 to 5 for demonstration 
let res : number = x1++; // Postfix increment: res is assigned 5, then x1 becomes 6
console.log("Value of res after postfix increment:", res); // Output: 5
console.log(x1); // Output: 6

x1=5;  //   Resetting x1 to 5 for demonstration

res = ++x1; // Prefix increment: x1 becomes 6, then res is assigned 6
console.log("Value of res after prefix increment:", res); // Output: 6
console.log(x1); // Output: 6

x1=5;  //   Resetting x1 to 5 for demonstration
res = x1--; // Postfix decrement: res is assigned 5, then x1 becomes 4
console.log("Value of res after postfix decrement:", res); // Output: 5
console.log(x1); // Output: 4   


x1=5;  //   Resetting x1 to 5 for demonstration
res = --x1; // Prefix decrement: x1 becomes 4, then res is assigned 4
console.log("Value of res after prefix decrement:", res); // Output: 4
console.log(x1); // Output: 4



       