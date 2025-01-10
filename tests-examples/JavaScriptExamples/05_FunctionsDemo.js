/**
 * block of code grouped code together
 */

function add(a, b){
    var greet = "Morning";
   return a+b;
}

let sum = add(2, 3);
console.log(sum);

//functons donot have names anonymous function

let sumofinteger = function add(a, b){
    return a+b;
 }


 let sumofinteger1 = (a, b) =>  a+b;
 
 console.log(sumofinteger1(10, 20));

 /**
  * difference between var, let and const
  * var - is global if delcared in global level. Accessed in entire file
  *     - is function level if declared inside funciton level. It cannot be accessed outside function {}
  * Let scope is withtin {} at function level or at block level cannot re-initialize it
  * 
  */

 var greet = "Evening";

 if(1==1){
    var greet = "Afternoon";

 }
 console.log(greet); //global level called and later re-declared in if block to overcome this let is used
 //If var is changed to let in above only global is printed as scope global remaining within {}
 //Try to use let as it cannot be used to re-declare
 //Const is same as let but it cannot be re-initialized
 //In auotmation use const for all locators