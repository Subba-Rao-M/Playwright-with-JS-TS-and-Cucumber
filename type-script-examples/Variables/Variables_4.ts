/**
 * Redeclaration
 * Var allows redeclaration within the same scope. Not safer as same variable gets updated
 * Let and Const do not allow redeclaration within the same scope.
 */

//var redeclaration allowed
var city = "Bengaluru";
console.log("Var redeclaration:", city);
var city = "Mumbai"; // Redeclaration allowed with var
console.log("Var redeclaration:", city); // Output: Mumbai


//let redeclaration not allowed
let country = "India";
console.log("Let initial value:", country);
//let country = "USA"; // Error: Cannot redeclare block-scoped variable 'country'

//const redeclaration not allowed
const pi = 3.14;
console.log("Const initial value:", pi);
//const pi = 3.1415; // Error: Cannot redeclare block-scoped variable 'pi'

/**
 * Reinitialization and Reassignment 
 * Var and Let allow reassignment of values.
 * Const does not allow reassignment; it must be initialized during declaration and remains constant.
 */

//var reassignment allowed
var temperature = 25;
console.log("Var initial value:", temperature);
temperature = 30; // Reassignment allowed with var
console.log("Var reassigned value:", temperature); // Output: 30  


//let reassignment allowed
let humidity = 60;
console.log("Let initial value:", humidity);
humidity = 65; // Reassignment allowed with let
console.log("Let reassigned value:", humidity); // Output: 65 

//const reassignment not allowed
const gravity = 9.8;
console.log("Const initial value:", gravity);
//gravity = 10; // Error: Cannot assign to 'gravity' because it is a constant.    