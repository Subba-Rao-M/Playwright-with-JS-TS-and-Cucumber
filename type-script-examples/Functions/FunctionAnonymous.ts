/**
 * Un named or nameless function
 * Anonymous function
 * it is called using variable name for which anonymous function is assigned
 * 
 * let variable = function(parameter){
 * function body
 * }
 * 
 * variable()
 * 
 */

// Anonymous function without parameter
let msg = function(): string{
 
    return "Hellp type script"
}

console.log(msg());

// Anonymous function with parameter

let multiply = function(a: number, b: number){
    return a*b;
}

console.log(multiply(10,20));

//Rest parameter, optional parameter and default parameter is also possible with anonymous function