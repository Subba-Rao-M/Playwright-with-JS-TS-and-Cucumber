/**
 * Can java script object can hold function. Explain with example.
 * 
 * Yes, JavaScript objects can hold functions as properties.
 * These functions are called methods when they are part of an object. 
 * Below is an example demonstrating this concept.
 * 
 * Example:
 */

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    fullName: function() {
        return this.firstName + " " + this.lastName;
    },
    greet : function() {
        console.log("Hello, " + this.fullName());
    }
}

console.log(person.age);
console.log(person.fullName()); // Output: John Doe
person.greet(); // Output: Hello, John Doe

// Explanation:
// Yes, JavaScript objects can hold functions as properties. These functions are called methods when they are part of an object. In the example above, the `person` object has two methods: `fullName` and `greet`. The `fullName` method returns the full name of the person by accessing the `firstName` and `lastName` properties using the `this` keyword. The `greet` method calls the `fullName` method and logs a greeting message to the console. This demonstrates how functions can be encapsulated within objects to provide behavior related to the object's data.