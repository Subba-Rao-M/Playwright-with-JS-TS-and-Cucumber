/**
 * map function created a new array based on output of calling functions by calling every element 
 * it takes function as parameter
 * returns same number of elements present in original array
 * Syntax: array.map(function(currentvalue, index, array) {} )
 * current value is mandatory and index and array parameters are options
 * it will not disturb original element values
 * return is mandatory in map while returning new array
 */

//Ex: Get the square of all elements in an array Ex: [1,2,3] and output [1,4,9]

let numbers: number[] = [1,2,3,4,5];
console.log(numbers);
let squarednumbers:number[]= numbers.map((element)=>{return(element*element)});
console.log(squarednumbers);

//Ex: double each element of an array {2,4,6,8,10}

let doublednumbers:number[] = numbers.map((element)=>element+element); // or element *2 // if single statement in arrow function { } and return statement is optional
console.log(doublednumbers);


