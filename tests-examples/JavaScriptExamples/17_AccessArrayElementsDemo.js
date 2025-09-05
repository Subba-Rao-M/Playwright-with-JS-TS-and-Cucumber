/**
 * Example JavaScript code for accessing array elements.
 * using push, pop, shift, unshift methods
 */

const fruits = ["Apple", "Banana", "Cherry", "Date"];
console.log("Original array:", fruits);

// Accessing elements by index
console.log("First fruit:", fruits[0]); // Apple
console.log("Second fruit:", fruits[1]); // Banana 

// Adding an element to the end of the array
fruits.push("Elderberry");
console.log("After push:", fruits); //[ 'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry' ]

// Removing the last element from the array
const lastFruit = fruits.pop();
console.log("After pop:", fruits); 
console.log("Removed fruit:", lastFruit); // [ 'Apple', 'Banana', 'Cherry', 'Date' ]

// Adding an element to the beginning of the array
fruits.unshift("Fig");
console.log("After unshift:", fruits);  // [ 'Fig', 'Apple', 'Banana', 'Cherry', 'Date' ]

// Removing the first element from the array
const firstFruit = fruits.shift();
console.log("After shift:", fruits);  // [ 'Apple', 'Banana', 'Cherry', 'Date' ]
console.log("Removed fruit:", firstFruit);// Fig


// Finding the index of an element
const index = fruits.indexOf("Cherry");// 2
console.log("Index of Cherry:", index); // 2    

// Accessing the last element using length property
console.log("Last fruit:", fruits[fruits.length - 1]); // Elderberry    

// Iterating over the array
console.log("All fruits:"); // 0  Apple, 1 Banana, 2 Cherry, 3 Date

fruits.forEach((fruit, idx) => {
    console.log(idx, fruit);
}); 

// Output the final state of the array
console.log("Final array:", fruits);  // [ 'Apple', 'Banana', 'Cherry', 'Date' ]      

//Remove an element by index using splice
const removedFruits = fruits.splice(1, 1); // removes 1 element at index 1
console.log("After splice (remove index 1):", fruits); // [ 'Apple', 'Cherry', 'Date' ]
console.log("Removed fruits:", removedFruits); // [ 'Banana' ]
fruits.splice(1, 0, "Blueberry"); // adds 'Blueberry' at index 1
console.log("After splice (add at index 1):", fruits); // [ 'Apple', 'Blueberry', 'Cherry', 'Date' ]







// To run this code, use the command: node 17_AccessArrayElementsDemo.js


