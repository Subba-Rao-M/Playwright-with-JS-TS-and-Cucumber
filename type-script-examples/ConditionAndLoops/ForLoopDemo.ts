/**
 * for loop reduces number of lines of code when you need to repeat a block of code certain number of times.
 * Syntax:
 * for (initialization; condition; increment/decrement) {
 *   // code block to be executed
 * }
 * 
 * 
 */

for (let i: number = 1; i <= 5; i++) { // initialization; condition; increment
    console.log("Value of i is:", i); // code block
}

// Example: Print even numbers from 2 to 10 // for odd numbers start from 1 and increment by 2
for (let num: number = 2; num <= 10; num += 2) { // initialization; condition; increment by 2
    console.log("Even Number:", num); // code block
}   

//Example: Print even numbers from 2 to 10 using if condition inside for loop
for (let num: number = 2; num <= 10; num++) {
    if(num % 2 === 0) {
        console.log("Even Number using if:", num);
    }
}

// Print numbers 1 to 10 in descending order
for (let descendingNum: number = 10; descendingNum >= 1; descendingNum--) {
    console.log("Descending Number:", descendingNum);
}

// Using break statement to exit loop prematurely
for (let i: number = 1; i <= 10; i++) {
    if (i === 6) {  // when i is 6, exit loop and execution of for loop ends
        break;
    }
    console.log("i before break:", i);
}

// Using continue statement to skip current iteration
for (let i: number = 1; i <= 10; i++) {
    if (i % 2 === 0) {  // skip even numbers and for loop continues to next iteration
        continue;
    }   
    console.log("Odd i using continue:", i);
}

// Nested for loop example: Print multiplication table from 1 to 5
for (let i: number = 1; i <= 5; i++) { // outer loop for first number
    for (let j: number = 1; j <= 5; j++) { // inner loop for second number
        console.log(`${i} x ${j} = ${i * j}`); // print multiplication result
    }
}

// Loop through an array using for loop
let fruits: string[] = ["Apple", "Banana", "Cherry", "Date"];
for (let index: number = 0; index < fruits.length; index++) {
    console.log("Fruit:", fruits[index]);
}

// Loop through a string using for loop
let sampleString: string = "Hello";
for (let index: number = 0; index < sampleString.length; index++) {
    console.log("Character:", sampleString.charAt(index));
}

// Using for loop to calculate the sum of first 10 natural numbers
let sum: number = 0;
for (let i: number = 1; i <= 10; i++) {
    sum += i; // add i to sum
}
console.log("Sum of first 10 natural numbers is:", sum);

let i1 : number = 1; // initialization of global i1
for (let i1: number = 1; i1 <= 5; i1++) { // scope of i is internal for for loop
    console.log("Value of i is:", i1); 
}
console.log("Final value of local i1 is not accessible here", i1);

for (i1 = 1; i1 <= 5; i1++) { // using global i1
    console.log("Value of global i1 is:", i1); 
}
console.log("Final value of global i1 is:", i1); //6 becuase last value was 5 and incremented value is 6 after exiting loop



let i2: number;
for(i2=0; i2<5; i2++); // no block of code to execute just increments value and prints final value
console.log("Value of i2 after for loop with empty body is:", i2); //5

//Initialization can have multiple variables
for (let a: number = 1, b: number = 5; a <= b; a++, b--) {
    console.log(`a: ${a}, b: ${b}`);
}   

//Initialization and increment/decrement can be omitted
let i3: number = 1;  
for (; i3 <= 5; ) {
    console.log("Count is:", i3);
    i3++;
}