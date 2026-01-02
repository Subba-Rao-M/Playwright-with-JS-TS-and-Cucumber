/**
 * filter - creates a new array with elements which pass/fail the condition in a funciton
 * takes function as parameter
 * returns same or fewer number of elements compared with original array
 * Syntax: array.filter(function(currentvalue, index, array) {} )
 */

//Ex1: Get only even numbers from an array of given numbers

let numbers: number[] = [1,2,3,4,5,6,7,8,9,10];
console.log(numbers);
let evenNumbers: number[] = numbers.filter((num)=>{ return (num%2==0)});
console.log(evenNumbers);

//Get the numbers which are greater than 3
let greaterNumbers: number[] = numbers.filter((num)=>num>3);
console.log(greaterNumbers);
