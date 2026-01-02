/**
 * Every item is an object which has group of properties
 * Object is a group of variables(properties) and methods(behavior)
 * Object is collection of key and value pairs in javascript/typescript
 * Examples: Employee, student, customer, 
 * In Java we need to create class to create objects
 * in type script, we can create object without creating class
 * Different ways to create objects: 
 * Using object type - direclty define object using key and value pair
 * Using inline type object - we will also specify data types for keys - Only for typescript 
 * Using Type aliases -
 * Using the classes - available only latest version of java script ES16
 * 
 * using Objects: directly define the values for variables
 * represents all values that are primitive data types
 * 
 * syntax: let objectname = {var1:val1, var2:val2, ....}
 * 
 */

let employee: object = {name: "John", age: 30, salary: 10000.00, job: "Engineering"};
//If object is specified methods cannot be added inside {} in java script
//If object is not specified, methods can be added in java script
//Typescript supports objects in both cases if method is added or not

let employee1= {
    name: "John", 
    age: 30, 
    salary: 10000.00, 
    job: "Engineering",
    getDetails: function(){
        console.log(this.name, this.age, this.salary, this.job);
        //this refers to current object properties
        return `${this.name} of age ${this.age} earning ${this.salary} in job ${this.job}`;
    }
}

console.log(typeof employee1);

//accessing object approach 1 - using . notation
console.log("accessing object approach 1 - using . notation")
console.log(employee1.name);
console.log(employee1.age);
console.log(employee1.getDetails())

console.log("accessing object approach 2 - using [] notation")
//accessing object approach 2 - using [] notation
console.log(employee1["name"], employee1["age"]);
console.log(employee1["getDetails"]());

//To modify the value in object
employee1.job = "Manager";
console.log(employee1["job"]);
employee1["job"]= "QA Manager";
console.log(employee1.job);