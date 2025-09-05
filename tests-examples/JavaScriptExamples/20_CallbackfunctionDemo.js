/**
 * Callback Function Demo
 */

function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}   


function callMe() {
    console.log("I am callback function");
}   

greet("Peter", callMe); 
// Output:
// Hello Peter
// I am callback function


// Another example with anonymous function as callback
//callback function is passed as an argument to another function
// and is executed after some operation is completed
// Here we simulate an asynchronous operation using setTimeout
//callback keyword replaces processData function and displayData functions passed as arguments to fetchData function   
//
function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetched");
        const data = "Sample Data";
        callback(data);
    }, 2000);   
}

function processData(data) {
    console.log("Processing: " + data);
}   

function displayData(data) {
    console.log("Displaying: " + data);
}

fetchData(processData);
fetchData(displayData);


/**
 * Difference between callback function and promise
 * 
 * Callback functions are functions passed as arguments to other functions
 *  and are executed after some operation is completed.
 *  They can lead to callback hell if not managed properly. 
 * Promises are objects that represent the eventual completion (or failure) of an asynchronous operation
 *  and its resulting value. They provide a cleaner way to handle asynchronous operations
 *  and avoid callback hell by chaining .then() methods.    
 */

