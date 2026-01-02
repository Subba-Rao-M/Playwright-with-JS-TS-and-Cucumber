/**
 * Passing array variable to function
 * returning array
 */

//Search an element in array using function

function searchElement(element: number, arr: Number[]): boolean{
    for(let i=0; i< arr.length; i++){
        if(arr[i]===element){
            return true;
        }
    }
    return false;
}

let arr: Number[]= [10,20,30,40,50];

console.log(searchElement(30, arr)); //true
console.log(searchElement(60, arr)); //false