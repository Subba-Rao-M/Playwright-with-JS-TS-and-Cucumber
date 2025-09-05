/**
 * Is java script asynchronous or asynchronous programming language?
 * Ans: JavaScript is an asynchronous programming language.
 * It uses an event-driven, non-blocking I/O model that allows it to handle multiple tasks concurrently without waiting for each task to complete before moving on to the next one.
 * This is achieved through mechanisms such as callbacks, promises, and async/await syntax, which enable developers to write code that can perform operations like network requests, file I/O, and timers without blocking the main thread of execution.
 * As a result, JavaScript is well-suited for building responsive and scalable applications, particularly in web development where handling user interactions and data fetching efficiently is crucial.
 */

console.log("Start of the script");

// Example of asynchronous operation using setTimeout. second argument is in milliseconds which waits for 2 seconds to execute the function present as first argument.
setTimeout(function(){
    console.log("This message is displayed after 2 seconds");
}, 2000);  

console.log("End of the script");