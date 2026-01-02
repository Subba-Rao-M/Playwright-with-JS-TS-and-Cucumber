//3. Named function with Rest parameters // dont restrict the number of values passed to parameters

function addNumber(...nums:number[]){
    let i;
    let sum: number = 0;
    for(i=0; i< nums.length; i++){
        sum=sum+nums[i];
    }
    console.log("Sum of numbers is : ", sum)
    //return sum;
}

addNumber(10, 34,12); //56
addNumber(1);
addNumber(1,2,3,4,100); // Same type of parameters should be passed

//5. Parameter with different types using union

function findElements(...ele:(number | string)[]): number{

return ele.length;

}

console.log(findElements(3, "John", "Test", 'E', 6));
