const flag = true;

if(!flag){
    console.log("Condition passed");
}
else{
    console.log("Condition is not passed");
}

/**
 * In if statment if condition is true it will be executed one time
 * While loop if condition is true it will always run the block of code
 */
let i=0;
while(i<10){
    console.log("Print from while loop");
    console.log(i);
    i++;

}

do{
console.log(i)
//i++;
}while(i<10);


for(let k =0; k<=10; k++){
    console.log("Value of k "+k);
}

let required = true;
while(required){
    console.log(required);
    required=false;
}

//print the logic to display multiples of 2 and 5 from 1 to 10
console.log("************************************");
let n=0;
for(let k =1; k<=100; k++){
   if(k%2 ==0 && k%5==0){
    console.log("Devided by 2 and 5 -->" +k);
    n++;
    if(n==3){ //to display only first 3 values
        break;
    }
   }
}