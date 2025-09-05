// Example of multi-dimensional array
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]; 
console.log("Matrix element at (1,2):", matrix[1][2]); // 6
console.log("Matrix element at (2,0):", matrix[2][0]); // 7 
console.log("Matrix element at (0,1):", matrix[0][1]); // 2
console.log("Matrix element at (2,2):", matrix[2][2]); // 9

console.log("Matrix:", matrix); // [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
console.log("Matrix row 0:", matrix[0]); // [ 1, 2, 3 ]
console.log("Matrix row 1:", matrix[1]); // [ 4, 5, 6 ]
console.log("Matrix row 2:", matrix[2]); // [ 7, 8, 9 ]
console.log("Matrix length:", matrix.length); // 3
console.log("Matrix row 0 length:", matrix[0].length); // 3

console.log("Matrix total elements:", matrix.length * matrix[0].length); // 9
console.log("Matrix as string:", matrix.toString()); // 1,2,3,4,5,6,7,8,9
console.log("Matrix flat:", matrix.flat()); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
console.log("Matrix flat length:", matrix.flat().length); // 9
console.log("Matrix flat element at index 4:", matrix.flat()[4]); // 5
console.log("Matrix flat element at index 0:", matrix.flat()[0]); // 1
console.log("Matrix flat element at index 8:", matrix.flat()[8]); // 9

console.log("Matrix flat element at index 2:", matrix.flat()[2]); // 3
console.log("Matrix flat element at index 1:", matrix.flat()[1]); // 2 
console.log("Matrix flat element at index 9:", matrix.flat()[9]); // undefined
console.log("Matrix flat element at index -1:", matrix.flat()[-1]); // undefined
console.log("Matrix flat element at index -2:", matrix.flat()[-2]); // undefined
console.log("Matrix flat element at index -10:", matrix.flat()[-10]); // undefined
console.log("Matrix flat element at index 10:", matrix.flat()[10]); // undefined
console.log("Matrix flat element at index 5:", matrix.flat()[5]); // 6