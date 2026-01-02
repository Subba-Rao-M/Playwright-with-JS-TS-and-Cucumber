/**
 * Declaration and Assignment
 * Declaration: Using var, let, or const followed by the variable name and optional type annotation.
 * Assignment: Using the assignment operator (=) to assign a value to the variable.
 * var x; Variable can be declared without initialization  
 * let y; Variable can be declared without initialization   
 * const z; Variable must be initialized during declaration  for const
 * const z = 30; Variable must be initialized during declaration
 * x = 10;
 * var y=20;
 * 
 * Var can be declared without initialization and assigned later.
 * Let can be declared without initialization and assigned later.
 * Const must be initialized during declaration; it cannot be declared without initialization.
 */

function declarationVariable() {
    if(true){
      var x; //data type is any in declaration
      let y;
      const z = 30; // Must be initialized during declaration else not accepted
      console.log("Var before assignment:", x);
      console.log("Let before assignment:", y); // Output: undefined
      console.log("Const during declaration:", z); // Output: 30
        x = 10; //Initilization
        y=20;
        console.log("Var after assignment:", x); // Output: 10
        console.log("Let after assignment:", y); // Output: 20
    }

}

declarationVariable();