/**
 * do while loop demonstrates the use of do while loop in TypeScript.
 * Syntax:
 * initialization;
 *  do {    
 *    // code block to be executed
 *   // increment/decrement;
 * } while (condition);
 * 
 */

let i : number = 1; // initialization
do {
    console.log("Value of i is:", i); // code block
    i++; // increment
} while (i <= 5); //atlease first iteration will be executed even if condition is false

// Example: Print odd numbers from 1 to 10
let oddNum: number = 1; // initialization
do {
    console.log("Odd Number:", oddNum); // code block
    oddNum += 2; // increment by 2
} while (oddNum <= 10);

// Example: Print numbers from 10 to 1 in descending order
let descNum: number = 10; // initialization
do {
    console.log("Descending Number:", descNum); // code block
    descNum--; // decrement
} while (descNum >= 1);