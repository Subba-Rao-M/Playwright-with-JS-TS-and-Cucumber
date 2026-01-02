/**
 * Stores multiple values for same or different type
 * Arrays declared using [] or Array<T>
 * index starts from 0
 * ordered collection of elements
 * Tuples is same like array but tuple is fixed size and arrays are dynamic
 */

// Storing data in array using literals

//Declaration
let names: string[ ]= [];

//Initialization
names[0] = "John";
names[1] = "Tom";
names[2] = "Jason";
names[3] = "Scott";

//Declaration and initialization in single line

//let names: string[ ]= ["John", "Tom", "Jason", "Scott"];

console.log(names);

//Using generic way Array<T>and most prefered one. Applicable only for typescript and for java script use only Array

let emp: Array<string> = ["John", "Tom", "Jason", "Scott"];

let empNo: Array<number> = [101,102,103,104];

//Store string or number

let data:Array<string | number> = ["John", 1, 2, 3, "Test"];

//to store any type of data

let mixedData: Array<any> = [1, "John",null, true, undefined]

//To retrieve the value using index
console.log(mixedData[1]);

//TO get the lenght of array

console.log(mixedData.length) //How many values stored in array

//Retrieve the values using traditional for loop
console.log("Employee Names: ");
for (let i=0; i<=mixedData.length-1; i++ ){
    console.log(mixedData[i]);
}

//Using for .... in and this also used index concept similar to classic for loop
console.log("Retrive id using for in option")
for(let i in empNo){
    console.log(empNo[i]);
}

//Using for of option to fetch data
// direct value is fetched and indexing is not used
console.log("For of loop");

for(let value of data ){
    console.log(value);
}