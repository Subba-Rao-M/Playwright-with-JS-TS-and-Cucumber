/**
 * Fixed length type array
 * Helps in storing multiple fields with different data types together 
 * 
 */

// Example 1: Tuple with 2 values

let person : [string, number] = ["Tom", 1]; //Fixed data type and length and operator is also not union operator

console.log(person[0]);
console.log(person[1]);

//Example 2: Tuples with mutiple values

let user: [string, number, boolean, number, string]= ["Tom", 1, true, 101, "Street 1"];
console.log(user);

for(let i=0; i<user.length; i++){
    console.log(user[i]);
}

for (let i in user ){
    console.log(user[i]);
}

for (let i of user){
    console.log(i);
}

//Tuples with array

let student: [number, string][] = [[101,"John"], [102,"Tom"], [103,"Jeevan"], [104,"Alice"], [105,"Brown"]];

console.log(student.length); //5
console.log(student[0]);//[101,"John"]


let tp = student[0];
console.log(tp[0]);
console.log(tp[1]);