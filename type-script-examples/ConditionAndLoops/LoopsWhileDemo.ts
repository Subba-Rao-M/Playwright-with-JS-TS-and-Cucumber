/**
 * Repeat a block of code while a specified condition is true.
 * Syntax:
 * initialization;
 * while (condition) {
 *   // code block to be executed
 *      //increment/decrement;
 * }
 * 
 * 
 */

let count: number = 1; // initialization
while (count <= 5) { // condition
    console.log("Count is:", count); // code block
    count++; // increment
}   

// Example: Print even numbers from 2 to 10 // for odd numbers start from 1 and increment by 2
let num: number = 2; // initialization
while (num <= 10) { // condition
    console.log("Even Number:", num); // code block
    num += 2; // increment by 2
}   

//Example: Print even numbers from 2 to 10 using if condition inside while loop
num = 2;
while (num <= 10) {
    if(num % 2 === 0) {
        console.log("Even Number using if:", num);
    }
    num++;
}

// Print numbers 1 to 10 in descending order
let descendingNum: number = 10; 
while (descendingNum >= 1) {
    console.log("Descending Number:", descendingNum);
    descendingNum--;
}

while (true) {
    console.log("This will run forever unless stopped manually.");
    break; // to prevent infinite loop, we use break here
}