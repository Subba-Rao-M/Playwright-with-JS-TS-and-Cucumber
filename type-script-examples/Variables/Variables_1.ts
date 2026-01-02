/**
 * Variables is a container to store data values.
 * In TypeScript, variables can be declared using three keywords: var, let, and const.
 * 
 * Syntax: keyword variableName: dataType = value;
 * 
 * data type is optional but recommended for better type checking and code clarity.
 * 
 * Example: let age: number = 25;
 *  Data Types: number, string, boolean, array, tuple, enum, any, void, null, undefined, never
 * 
 * 
 * Variable Naming Rules:
 * 1. Must start with a letter, underscore (_), or dollar sign ($).
 * 2. Subsequent characters can be letters, digits, underscores, or dollar signs.
 * 3. Cannot be a reserved keyword in TypeScript.
 * 4. Case-sensitive (e.g., myVar and myvar are different).
 * 5. Should be meaningful and descriptive.
 *  
 * Examples: 
 *  let age: number = 30;
 * let firstName: string = "John";
 *  let isStudent: boolean = true;
 *  let scores: number[] = [90, 85, 88];
 * let person: [string, number] = ["Alice", 25];
 *  enum Color { Red, Green, Blue }
 * let randomValue: any = 10;
 * let nothing: void = undefined;
 * let empty: null = null;
 * let notDefined: undefined = undefined;
 * let neverValue: never;
 *  
 * Differences between var, let, and const:
 * 
 * 1) Scope: Accessible area of the variable or visibility. Two types functional and block scope.
 * 2) Declaration and Value Assignment:
 * 3) Redeclaration:
 * 4) Reinitialization and Reassignment:
 * 5) Hoisting:
 * 
 * 1. var: Function-scoped, can be redeclared and updated. In modern TypeScript, its use is discouraged in favor of let and const.
 * 2. let: Block-scoped use when value keeps changing, cannot be redeclared in the same scope but can be updated.
 * 3. const: Block-scoped use when value is not getting changed, cannot be redeclared or updated; must be initialized at declaration.     
 * 

 * function example() {
    *     var x: number = 10;   //Functional Scope
    * if (true) {
    *    let y: number = 20;   //Block Scope
    *    const z: number = 30;  //Block Scope
    * }
    * }
 * 
 * 
 *  
 * 
 * 
 * 
 */

