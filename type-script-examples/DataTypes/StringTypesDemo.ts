/*
String represents textual data or group of characters
String can be represeted with  ' or " and `(backtick)
backtick is used for paramterizing values in string value
*/

let firstName: string = 'John'; // using single quotes
let lastName: string = "Doe"; // using double quotes    
let fullName: string = `${firstName} ${lastName}`; // using backticks for template literal

let greeting: string = `Hello ${firstName} ${lastName}`; // using backticks for template literal

console.log("First Name:", firstName);
console.log("Last Name:", lastName);
console.log("Full Name:", fullName);

console.log(greeting)

console.log(typeof firstName); // Output: string

console.log("Hello", firstName, lastName)

console.log("Hello, " + fullName + "! Welcome to TypeScript."); // concatenation example