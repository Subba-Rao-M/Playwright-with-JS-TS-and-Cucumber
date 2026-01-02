/**
 * some() - function checks if any elements satisfies the condition and if satisfies returns true else false
 * Syntax: array.some(function(currentvalue, index, array) {} )
 * 
 * every() - opposite of above. function checks if every element satisfies the condition
 * if all elements satisfied, returns true or else false
 * Syntax: array.every(function(currentvalue, index, array) {} )
 */

//Ex1: check if array contains negative numbers or not

let numbers: number[] = [1,2,3,4,5];
//let numbers: number[] = [1,2,3,4,-5];
let hasNegativeNumber: boolean = numbers.some((num)=>{ return (num<0)});
console.log(hasNegativeNumber);

//all numbers in an array should be positive
let hasAllPositive : boolean = numbers.every((num)=>{ return (num>0)});
console.log(hasAllPositive);

let allEven: boolean = numbers.every((num)=> num%2==0);
console.log("all elements are even",allEven);