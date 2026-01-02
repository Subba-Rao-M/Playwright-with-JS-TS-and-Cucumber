let numbers : number[] = [1,2,3,4,5];
let fruits : string[] = ["apple", "mango", "orange", "banana"];

console.log("numbers array", numbers); //numbers array [ 1, 2, 3, 4, 5 ]
console.log("Fruits array", fruits); //Fruits array [ 'apple', 'mango', 'orange', 'banana' ]

// length is array attribute not method

console.log(" Size of numbers array", numbers.length); //5
console.log(" Size of Fruits array", fruits.length); //4

/**
 * Push - add single or group of elements at the end of array
 * arrayname.push(elem1, 2,...n)
 */

numbers.push(6);
numbers.push(6,7);
console.log("numbers array", numbers); //numbers array [1, 2, 3, 4, 5, 6, 6, 7 ]


/**
 * pop - removes only last element from array
 * arrayname.pop()
 */

numbers.pop();
console.log("numbers array", numbers); //numbers array [1, 2, 3, 4, 5, 6, 6 ]

let lastfruit : string | undefined = fruits.pop();
console.log(fruits);//[ 'apple', 'mango', 'orange' ]
console.log(lastfruit); //banana

/**
 * shift - removes the first element from array
 * arrayname.shift()
 */

let firstfruit : string | undefined = fruits.shift();
console.log(firstfruit); //apple

/**
 * unshift - add the single or multiple elements in the begnining of array
 * arrayname.unshift()
 */

fruits.unshift("strawberry", "apple", "custard apple");
console.log(fruits); //[ 'strawberry', 'apple', 'custard apple', 'mango', 'orange' ]

/**
 * new array = arrayname.concat(v1, v2..vn)
 * combine 2 or more arrays and retrun combined array
 */


let combinedarray: number[] = numbers.concat([10,11], [12,13]);
console.log("Original array", numbers);//[1, 2, 3, 4, 5, 6, 6 ]
console.log("Concatendated array", combinedarray);//[1, 2,  3,  4,  5, 6, 6, 10, 11, 12, 13]

//numbers.concat(fruits) -- concatinate should be of same type, different type is not allowed

/**
 * slice() - to extract section of an array
 * start index from 0
 * end index is excluded i.e end index value - 1
 * slice(start, end) 
 */
console.log("Original Array: ", fruits); //[ 'strawberry', 'apple', 'custard apple', 'mango', 'orange' ]
let extractedArray1 : string[]= fruits.slice(1,3) //  display index values 1 and 2 
console.log("After slice: ",extractedArray1); //[ 'apple', 'custard apple' ]

let extractedArray2 : string[] = fruits.slice(2,5) //  display index values 2 and 4 
console.log("After slice: ",extractedArray2); //After slice:  [ 'custard apple', 'mango', 'orange' ]



/**
 * splice() - adds/removes element from everywhere
 * array.splice(start, deletecount, item 1,...,item n)
 * delete count is optional
 */

console.log("Original Array before Splice: ", fruits); //[ 'strawberry', 'apple', 'custard apple', 'mango', 'orange' ]
let removedelements : string[] = fruits.splice(1,2) ; // Remove 2 elements starting form index 1 
console.log("After splice removal", removedelements); //[ 'apple', 'custard apple' ]
console.log("Original Array after Splice: ", fruits);//[ 'strawberry', 'mango', 'orange' ]


// add elements and specify 0 for delete if no elements to be removed

fruits.splice(1,0, "Pineapple", "Lichie")
console.log("Original Array after Splice for adding: ", fruits); //  [ 'strawberry', 'Pineapple', 'Lichie', 'mango', 'orange' ]

fruits.splice(1,2,'apple', 'custard apple');
console.log("Original Array after Splice for adding and deleting: ", fruits); // [ 'strawberry', 'apple', 'custard apple', 'mango', 'orange' ]

/**
 * indexOf(element) - returns index value and if not found retuns -1
 * or indexOf(search element, starting index)
 */

let indexOfCA: number = fruits.indexOf("custard apple");
console.log("Index value of custard apple: ", indexOfCA); //2

let indexOfBanana : number= fruits.indexOf("Banana");
console.log("Index value of Banana: ", indexOfBanana); //-1

//Index will not change but starts searching value from index 1
let indexOfCAwithStartingIndex = fruits.indexOf( "custard apple", 1);
console.log("Index value of custard apple from starting index 1: ", indexOfCAwithStartingIndex); //2

/**
 * includes - checks if element exists or not
 * returns true or false
 * 
 */

let isCAExists: boolean = fruits.includes("custard apple");
console.log("custard apple exists: ", isCAExists); //true

let isBananaExists : boolean = fruits.includes("banana");
console.log("Banana exists: ", isBananaExists); //false

/**converts array to string
 * array.toString()
 */

console.log("Original array format", numbers); [1,2,3,4,5,6,6]
console.log("COnverted array to string : ", numbers.toString()); //1,2,3,4,5,6,6

let welarray: string[] = ['w', 'e', 'l', 'c', 'o', 'm', 'e']
console.log("Original string array: ", welarray);

let str : string = welarray.toString(); // [  'w', 'e', 'l',   'c', 'o', 'm',   'e' ]
console.log("Converting welarray to string : ", str); // w,e,l,c,o,m,e