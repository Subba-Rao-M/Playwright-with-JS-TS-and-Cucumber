/**
 * Function overloading  - multiple versions of function with same name, different parameters and different return type
 * Method overloading - polymorphism concept
 * 
 * 
 * Write signatues of function - function without body/ implementation
 * Implement the signatures
 * calling the function
 */

//Create function signatures
function getInfo(id:number): string;
function getInfo(name: string): string;

//Implement the function - Single function should be written to implement all signatures

function getInfo(parameters: number | string): string{

    if(typeof(parameters)== "number"){
        console.log("Parameter value for number is ", parameters);
        return (`User id is ${parameters}`);
    }
    else if (typeof(parameters) == "string") {
        console.log("Parameter value for string is ", parameters);
        return (`User name is ${parameters}`);
    }
    else {
        return "Enter valid data"
    }
}

getInfo(100);
getInfo("Scott");
console.log(getInfo(101));
console.log(getInfo("Testing 2nd value"));

//Examples 2 - different parameters

function add(a: number, b:number): number;
function add(a: number, b:number, c:number): number;

function add(a: number, b:number, c?: number): number{
    if(c !== undefined){
        return a+b+c;

    }
    return a+b;

}

console.log(add(1,2));
console.log(add(1,2,3));

//Example 3 - different return types

function processInput(str: string): string;
function processInput(num:number): number;

function processInput(input : string | number): string | number{
if(typeof input== "string"){
   return input.toUpperCase();
}
else
{
    return input*2;
}

}

console.log(processInput("Rao"));
console.log(processInput(5));


//Example 4: 

function greeting(name: string) : string;
function greeting(age:number ): string;
function greeting(ismarried: boolean) : string;

function greeting(inputs: string | number | boolean): string {

    if(typeof inputs == "string"){
        return `Hello ${inputs}`;
    }
    else if(typeof inputs == "number"){
        return `You are ${inputs} years old`;
    }
    else {

       let res: string = inputs? "married" : "single";
       return res;
    }

}

console.log(greeting("John"));
console.log(greeting(38));
console.log(greeting(false));