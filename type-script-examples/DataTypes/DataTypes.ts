/**
 * Type/Data Types
 * Annotations
 * Type inference
 * 
 * Example: let age: number = 25; (with annotation)
 * number - > data type
 * : number -> type annotation (colon followed by data type) - Process of explicitly specifying the data type of a variable during declaration.
 * age -> variable name
 * = 25 -> value assignment
 * 
 * let age = 25; (type inference by compiler. compiler infers age as number)
 * 
 * difference between type annotation and type inference
 * 
 * Type Annotation: Explicitly specifying the data type of a variable during declaration.
 * Example: let age: number = 25; Here, : number is the type annotation indicating that age is of type number.
 * Type Inference: The process by which the TypeScript compiler automatically deduces the data type of a variable based on the assigned value, without an explicit type annotation. 
 * 
 * Different Data Types in TypeScript:
 * Primitive Data Types: number, string, boolean, any, void, null, undefined, union types, void
  * Non-Primitive Data Types (Objects): array, tuple, enum,  never, object, unknown, intersection types, array, class, functions
 
 * Primtive Data types: to store single values
 * Non-Primitive Data types: to store multiple values
 * 
 * 
 * 1. number: Represents numeric values, both integers and floating-point numbers.
 * 2. string: Represents sequences of characters, enclosed in single quotes (' '), double quotes (" "), or backticks (` `) for template literals.
 * 3. boolean: Represents logical values, either true or false.
 * 4. array: Represents a collection of values of the same type, defined using square brackets [].
 * 5. tuple: Represents an array with a fixed number of elements of specific types, defined using square brackets [] with specified types for each element.
 * 6. enum: Represents a set of named constants, defined using the enum keyword.
 * 7. any: Represents a variable that can hold values of any type, effectively opting out of type checking for that variable.
 * 8. void: Represents the absence of a value, typically used as the return type for functions that do not return a value.
 * 9. null: Represents the intentional absence of any object value.
 * 10. undefined: Represents a variable that has been declared but not assigned a value.    
 * 11. never: Represents a type that never occurs, typically used for functions that always throw an error or never return.
 * 12. object: Represents non-primitive types, i.e., anything that is not number, string, boolean, symbol, null, or undefined.
 * 13. unknown: Represents a variable that can hold any value, similar to any, but is safer as it requires type checking before performing operations on it.
 * 14. bigint: Represents whole numbers larger than 2^53 - 1, which is the largest number JavaScript can reliably represent with the number type.
 * 
 * 
 * 
 * 
 */

