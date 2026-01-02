/**
 * Advanced array function methods:
 * forEach, map, filter, reduce, some, every
 * 
 * forEach is a method and not looping statement used for each
 * for each executes for each array element
 * it takes function as parameter, function can be named, anonymous or arrow function
 * 
 * Syntax: array.forEach(function(currentvalue, index, array) {} )
 * currentvalue - current element, for first execution element 1, 2 , 3 ...etc
 * index - the index of current value is captured
 * array - name of the array on which operated
 * index and array parameters are options and current value is mandatory
 * for each will repeat the function for each element of an array
 */

//Ex: Get index of all fruits along with value

let fruits: string[] = [ 'strawberry', 'apple', 'kiwi', 'mango', 'orange' ];
 console.log("Classic for loop");
 //Use this classic loop if for loop needs to start from specific index, other options cannot be used
for (let i=0; i< fruits.length; i++){
   
    console.log(`Fruits in index ${i} is ${fruits[i]}`);
}
console.log("For In");
for(let i in fruits){
    
    console.log(`Fruits in index ${i} is ${fruits[i]}`);
}

console.log("For each function/method - anonymous");

fruits.forEach(function(element, index){
    console.log(`${element} is present in index ${index}`);
});

console.log("\nFor each function/method - arrow function");

fruits.forEach((element, index)=>{
    console.log(`${element} is present in index ${index}`);
});

console.log("\nConvert all the fruits value to upper case");

fruits.forEach((element)=>{ // index value is not required to use in below function statements
    console.log(element.toUpperCase());
});
