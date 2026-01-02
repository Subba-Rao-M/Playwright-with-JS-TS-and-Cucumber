/**
 * reduce() - applies the function on every elements of an array and returns single value
 *
 *  Syntax: array.filter(function(accumulatorvalue, currentvalue, index, array) {} )
 * 
 * it will not return array instead single value is returned
 */

//Ex: add all the numbers in an array and get the sum of it

let numbers: number[] = [1,2,3,4,5];

let totalvalue = 0;

for (let i=0; i< numbers.length; i++){
    totalvalue = totalvalue+numbers[i];
}
console.log(totalvalue);


let sumOfNumbers= numbers.reduce((total, num)=>{return(total+num) }); //if default value is not mentioned total is assume it as 0
console.log(sumOfNumbers);

//if total value has some default value then add it after } example below

let sumOfNumberswithDefaultvalue= numbers.reduce((total, num)=>{return(total+num) },5); //default value is 5 the parameter is optional for accumulator value
console.log(sumOfNumberswithDefaultvalue);