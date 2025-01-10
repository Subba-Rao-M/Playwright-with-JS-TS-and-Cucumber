/**
 * Arrays is a collection of elements
 * Set of elements can be stored in container called array
 */

var marks = Array(6); //array to store 6 elements
var marksval = new Array(20, 21, 16, 23, 19, 50); //Store values to above array using object
//Above both cannot be let in same block scope as let does not support re-declaring of same variable

//Another way

var stdmarks = [20, 21, 16, 23, 19, 50];
//Retrive value from array
console.log(stdmarks[2]);
//Update value in array
stdmarks[3]=15;

console.log(stdmarks)

console.log("Lenght of array",stdmarks.length)

//Add one more element to array at the end

stdmarks.push(24);

console.log(stdmarks)

stdmarks.pop();
console.log(stdmarks)

//To add the element in the begining of array
stdmarks.unshift(17);
console.log(stdmarks)

//To know the index of an element in array
console.log(stdmarks.indexOf(16));

//To know if the element is present in array or not
console.log(stdmarks.includes(16));

//Break the array and create a sub - array form main array
//Subarray takes data type from parent no need to specify
subarray = stdmarks.slice(2, 5); // 2 to 4 3 items
console.log(subarray);

for(let i=0; i<stdmarks.length; i++){
    console.log(stdmarks[i]);
}


//To sum of all elemens in array

var sum = 0;
for(let i=0; i<stdmarks.length; i++){
    console.log(stdmarks[i]);
    sum = sum+ stdmarks[i];
}
console.log(sum)

//Reduce filter map helps in writing above loops in single line
                        /** to hold value, array value from iteration , operation and start value */
var total = stdmarks.reduce((sum, marks)=> sum+marks, 0);
console.log("Reduce method verification --****-->", total);

//To create new array with even numbers
var evennumber = [];
for(let i=0; i<stdmarks.length; i++){
    console.log(stdmarks[i]);
    if(stdmarks[i]%2==0){
        evennumber.push(stdmarks[i]);
    }
}
console.log(evennumber)

//using filter method

let newevenfilterarray = stdmarks.filter(score=> score%2==0);
console.log(newevenfilterarray)

//map function will map the one value from array to new value

//Create a new array with even numbers and multiply the values with 3
let mappedarray = newevenfilterarray.map(score=>score*3);
console.log(mappedarray)
let totalsymmedarray = mappedarray.reduce((sum, value)=> sum+value, 0);
console.log(totalsymmedarray);

//Chaining of above code

let sumvalued = stdmarks.filter(score=> score%2==0).map(score=>score*3).reduce((sum, value)=> sum+value, 0);
console.log("Chain value", sumvalued)

//Sorting an array with strings -- sort method will sort only array with strings

let fruits = ["banana", "apple", "orange", "kiwi"]
console.log(fruits.sort())
console.log(stdmarks.sort())

//To reverse the sort order

console.log(fruits.reverse());

var numscores = [12, 3, 19, 16, 14]; //if any value has 0 in the begining 

console.log(numscores.sort((a,b)=>a-b)); //finds the difference between nearest values using bubble sort methd