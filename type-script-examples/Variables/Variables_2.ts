/**
 * Scope of Variables_2.ts
 */

function functionScopeExample() {
    if(true){
        var msg = "Hello, World!"; 
        console.log(msg); // Accessible here within the block
    }
    console.log(msg); // Accessible here due to function scope
}

functionScopeExample();


function blockScopeExample() {
    if(true){
        var num1 = 100;
        let num2 = 200;
        const num3 = 300;
        console.log(num1); // Accessible here within the block
        console.log(num2); // Accessible here within the block
        console.log(num3); // Accessible here within the block
    }
    console.log(num1); // Accessible here due to function scope
    // console.log(num2); // Error: num2 is not defined
    // console.log(num3); // Error: num3 is not defined
}

blockScopeExample();