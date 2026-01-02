/**
 * Method overloading
 * function overloading
 * constructor overloading
 * name is same but signatuture is different
 * 
 */

class Calculator{


    //Constructor overloading
    constructor(); //Default constructor
    constructor(a:number,b: number); //Parameterized constructor

    constructor(a?:number, b?:number){
        if(a!==undefined && b!==undefined){
            console.log("Sum of a & b is : ", (a+b));
        }
        else{
            console.log("Both a and b are undefined"); //Default constructor called
        }
    }


    //Method Overloading
    add(a:number,b: number): number;
    add(a:number,b: number, c:number): number;

    add(a:number,b: number, c?:number): number{
        if(c!==undefined){
            return a+b+c;
        }
        else{
            return a+b;
        }
    }

}

//constructor overloading

let calc1 = new Calculator();
let calc2 = new Calculator(10,20);

//Method overloading
console.log("Adding two numbers", calc1.add(10,20));
console.log("Adding three numbers", calc2.add(10,20,30));


//If class is not used then it will be function overloading