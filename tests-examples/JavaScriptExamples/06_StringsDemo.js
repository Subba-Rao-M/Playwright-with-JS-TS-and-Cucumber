let day = 'Tuesday ';
//String is a collection of characters and array is collection of indexes

//To get the lenght of string
console.log(day.length)

//To get sub string
let subday = day.substring(0,3);
console.log(subday);

//To ge the character using index
console.log(day[1]);

//Split the string as Tue and day

let splitday = day.split("s");
console.log(splitday);
console.log(splitday[1]);
console.log(splitday[1].trim().length);

//To trim the spaces 

console.log(day.trim().length)

//To conver the string into number

let a = '27';
let b = '17';

let diff = parseInt(a) - parseInt(b);
console.log(diff);

console.log(diff.toString()); //Convert number to string

//String concatination

let newQuote = day+'is Fun day';
console.log(newQuote);

//To find the idex of letter d

let val = newQuote.indexOf('day', 5); //2nd part starts from 5th index to search 2nd one optional parameter
console.log(val);

//Write a program to find how many times day has appeared in a string
let count = 0;
let value = newQuote.indexOf('day');

while(value!==-1){
    count++;
    value = newQuote.indexOf('day', value+1)
}
console.log(count);


