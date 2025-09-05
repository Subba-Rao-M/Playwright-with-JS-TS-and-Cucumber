/**
 * var is function-scoped and can be re-declared and updated.
 * let is block-scoped and can be updated but not re-declared within the same scope.
 * const is block-scoped and cannot be updated or re-declared. It must be initialized at the time of declaration.       
 * if data type is not declared it will be treated as var
 * 
 * In modern JavaScript, it's generally recommended to use let and const over var to avoid scope-related issues and enhance code readability.
 */

function varTest() {
    var x = 1; 
    if(true) {
        var x = 2;  // same variable!
        console.log(x);  // 2
    }  
    console.log(x);  // 2
}


varTest();

function letTest() {
    let y = 1;
    if(true) {
        let y = 2;  // different variable
        console.log(y);  // 2
    }
    console.log(y);  // 1
}

letTest();

function constTest() {
    const z = 1;
    if(true) {
        const z = 2;  // different variable
        console.log(z);  // 2
    }
   // z=3; // This will cause an error because z is a constant and cannot be reassigned
    console.log(z);  // 1
} 

constTest();