/**
 * from ES6 we have let and const available
 * till ES5 only var is used
 * 
 */

var a = 4;
var text = "hello";
let b = 6.678;
console.log(b);
//In java script we have a function called typeof to know the data type of variables
console.log(typeof(text));
console.log(typeof(b));

let required = true;
console.log(typeof(required))

// data types supported : string, number,  null and undefined

let c = a+b;
console.log(c);
console.log(typeof(c))


//redeclare and reassign - assigning value to existing variable instead of redeclaring using let/var
//we cannot re-decalre variable with let keyword but possible with var
//With var both re-declare and re-assign allowed and with let only re-assign allowed
//Arithmentic operators : +, -, * and /
//Not operator for boolean values : !
console.log(!required);

//const value is constant - it cannot be re-assinged and re-delcared
const d= 10;
d=300;
console.log(d);