// Only true or false values can be assigned to boolean type variables

let isActive: boolean = true; // with type annotation
let isAdmin = false; // with type inference

console.log("Is Active:", isActive);
console.log("Is Admin:", isAdmin);
console.log(typeof isActive); // Output: boolean

/**
 * Null and undefined are special data type in type script
 * null represents intentional absence of any object value
 * undefined represents a variable that has been declared but not assigned a value
 * 
 * Both null and undefined can be assigned to variables of other types using union types
 */

let emtyValue: null = null; // variable with null type
//emptyvalue =100; // reassigning with number value is not allowed for null


let notAssigned: undefined = undefined; // variable with undefined type
// notAssigned = "Hello"; // reassigning with string value is not allowed for undefined




//Any Data type can hold any value and can be reassigned with any type of value
//Loses the type safety feature of TypeScript
//violates the purpose of using TypeScript


let randomValue: any = 10;  // initially a number
console.log("Random Value:", randomValue);  
console.log(typeof randomValue);
randomValue = "Now I'm a string"; // reassigned to string
console.log("Random Value:", randomValue);  
randomValue = true; // reassigned to boolean
console.log("Random Value:", randomValue);
console.log(typeof randomValue);

//Union types - union type is not keyword but a concept of combining multiple types using | (pipe) symbol

let userName: string | null = null; // variable that can hold string or null
let userAge: number | undefined; // variable that can hold number or undefined  

let id: string | number | null; // variable that can hold string or number or null

id = "user  123"; // assigning string value
console.log("ID:", id);
id = 456; // assigning number value
console.log("ID:", id);
id = null; // assigning null value
console.log("ID:", id);


//void is used for functions not variables
function logMessage(message: string): void { // in java void is written before function name
    console.log("Log:", message);
}

logMessage("This is a void function"); //if function does not return anything it is void function and if it returns refer to data type gets returned instead of void


function returnNumber(): number {
    return 42;
}   

console.log("Returned Number:", returnNumber());