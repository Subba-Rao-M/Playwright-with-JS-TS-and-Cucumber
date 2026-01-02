/**
 * Callback function -> function itself as argument
 * not important for automation
 * callback function is passed as parameter to another function and executed later
 * used when the function wants to execute after executin another function
 * to solve asynhronous nature of solving problem
 * Syntax:
 * 
 * function name(a: number, b: number, callbackfunction: any){
 * 
 * callbackfunciton()
 * //function code
 * 
 * }
 * 
 * function xyz(){
 * 
 * }
 * 
 * name(1, 2, xyz)
 * 
 */

function greets(uname: string, clbfun: (message: string)=> void){
    console.log(uname);
    clbfun("hello");

}

//callback function
function showMessage(message: string) {
    console.log(message);
}

greets("Scott", showMessage)


//Example 2

function calc(va1: number, va2: number, disRes:(res: number)=> void){
    let res = va1+va2;
    disRes(res);
}


function disRes(result: number): void{ // returns void, based on this return type update above return type for call back function
    console.log("Result is : ", result)
}

calc(10, 20, disRes);
