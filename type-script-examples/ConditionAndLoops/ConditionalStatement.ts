/**
 * Conditional Statement - Decision making statements
 * Executes different actions based on different conditions
 * 
 * 
 * 
 * Looping Statement - iteration statements
 * 
 */

let age: number = 20;
//let age: number = 15;
//let age: number = 18;
//if statement
if (age >= 18) {
    console.log("You are eligible to vote.");
}

//if-else statement
if (age >= 18) {
    console.log("You are eligible to vote.");
} else {
    console.log("You are not eligible to vote.");
}


//print even or odd numbers

if (age % 2 === 0) {
    console.log(age, "is an even number.");
} else {
    console.log(age, "is an odd number.");
}

// another example of if-else

let number: number = 10;

if (number %2 ===0) {
    console.log(` ${number} is even.`);
}
else {
    console.log(`${number} is odd.`);
}

//if-else if-else statement
if (age < 13) {
    console.log("You are a child.");   
} else if (age >= 13 && age < 20) {
    console.log("You are a teenager.");
} else {
    console.log("You are an adult.");
}

//browser selection using if-else if-else
let browser: string = "Chrome";

if (browser === "Chrome") { // Strict equality operator === to check both value and type of value
    console.log("You are using Google Chrome.");
} else if (browser === "Firefox") {
    console.log("You are using Mozilla Firefox.");
}
else if (browser === "Safari") {
    console.log("You are using Apple Safari.");
}   else {
    console.log("Unknown browser.");
}

/**
 * switch statement - alternative to multiple if-else statements
 * switch expression is evaluated once and returns value
 * based on the match, the corresponding block of code is executed  
 * 
 * Syntax:  
 *  switch (expression) {   
 *   case value1:   
 *      // code block   
 *  
 *  break;
 *  case value2:
 *      // code block
 *  
 * break;
 *  ...
 *  
 *  
 * default: 
 *     // code block
 * break;   
 * }    
 * 
 */

//Example of switch statement: Depending on day of week print the name of the day

let day: number = 3; // 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday    
switch (day) {
    case 1:
        console.log("Monday");  
        break;
    case 2:
        console.log("Tuesday");
        break;  
    case 3:
        console.log("Wednesday");
        break;  
    case 4:
        console.log("Thursday");
        break;  
    case 5:
        console.log("Friday");
        break;  
    case 6:
        console.log("Saturday");
        break;  
    case 7:
        console.log("Sunday");
        break;  
    default:
        console.log("Invalid day");
        break;  
}

//Switch case statement with expression
let x: number = 10, y: number = 20;
switch (x - y) {
    case 0: console.log(" result is zero"); break;
    case 10: console.log("result is ten"); break;
    case -10: console.log("result is negative ten"); break;
    //default case is optional
}