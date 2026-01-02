/*
Assignment Operator =

The assignment operator (=) is used to assign a value to a variable. It takes the value on the right side and assigns it to the variable on the left side.
short hand for assignment operator is  +=, -=, *=, /=, %=, **= etc.

*/

let x: number = 10, y: number = 2;
x=100;
y=50;
console.log("Value of x after assignment:", x); // Output: 100
console.log("Value of y after assignment:", y); // Output: 50


// Using shorthand assignment operators
x += 20; // Equivalent to x = x + 20
console.log("Value of x after += 20:", x); // Output: 120   

y *= 3; // Equivalent to y = y * 3
console.log("Value of y after *= 3:", y); // Output: 150    

x -= 30; // Equivalent to x = x - 30
console.log("Value of x after -= 30:", x); // Output: 90

y /= 5; // Equivalent to y = y / 5
console.log("Value of y after /= 5:", y); // Output: 30     

x %= 7; // Equivalent to x = x % 7
console.log("Value of x after %= 7:", x); // Output: 6

y **= 2; // Equivalent to y = y ** 2
console.log("Value of y after **= 2:", y); // Output: 900

