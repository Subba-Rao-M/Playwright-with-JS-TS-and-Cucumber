/**
 * Arrow or Lamda function is also comes under anonymous functions
 * instead of function keyword arrow mark => is used
 * => also called goes to parameter
 * most preferred one
 * 
 * Syntax:
 * 
 * let variable = (arguments) =>{
 * }
 * 
 * variable(parameters)
 */

// Arrow function without parameter and return value

let txt = (): void => {
    console.log("Hello type script");
}

txt();

//With parameter and return type

let add = (a:number, b:number): number =>{
    return a+b; // if single return statement {} and return statement is optional
}

console.log(add(10,20));

// When function has single return statement only as function body
let mul = (a:number, b:number): number => a*b;
console.log(mul(10,20));

//Arrow function with optional parameter
//If first parameter is optional and the following parameter should also be optional - constraint in typescript
let displayDetail = (id: number, name: string, emailId?: string): void =>{
console.log("ID : ", id)
console.log("Name : ", name)
if(emailId!=undefined){
    console.log("Email ID: ",emailId)
}
}

displayDetail(123, "Scott", "Scott@email.com")
displayDetail(123, "Scott")

//Arrow function with default parameter

let calcDiscount = (price: number, rate:number=0.50): void =>{

    let discount = price* rate;
    console.log("Discount Amount:   ", discount)

}

calcDiscount(1000, 0.30); //300 // Default value is overriden 
calcDiscount(1000) //500 default value is considered for parameter


// Arrow function with rest parameter

let findEl = (...ele:(number | string)[]): number => ele.length;

console.log(findEl(3, "John", "Test", 'E', 6));