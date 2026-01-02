/**
 * Inhertitance concept - varaibles and methods from parent class can be used in child class
 * helps in reusability by using super keyword and method overriding
 * 
 * Class A -- > Properties and Methods - (Parent Class, Base Class or Super Class)
 * Class B extends A -- Properties and Methods + above class properties and methods (Child class, derived class or sub class)
 */
//Parent Class
class Car{
    //Properties
    name: string;
    color:string;
    model: string;

    //constructor
    constructor(name:string, color: string, model: string){
        this.name = name;
        this.color = color;
        this.model = model;
    }

    //methods

    start(){
        console.log("Car Started");
    }

    stop(){
        console.log("Car Stopped");
    }

    displayInformation(){
        console.log(`Name: ${this.name} and Color: ${this.color} and model is : ${this.model}`)
    }

}

//Child class - > To add relation add extends keyword
class Honda extends Car{
   
    year: number

    constructor(name:string, color: string, model: string, year:number){ // Add the parent class construcor parameter
        super(name, color, color); //To invoke parent class constructor map parameters
        this.year = year;
    }

    //methods
    start(){ // Overriding
       console.log("Honda Started")
    }
    /**
     * Method overriding - same name of method in parent and child class
     * should have same return type and parameters
     */

    yom(){
        console.log(`Year of manufacturing : ${this.year}`)
        //Can get details from Parent class as well like below
        console.log(`Name: ${this.name} and Color: ${this.color} and model is : ${this.model} and Year of manufacturing : ${this.year}`)
    }
}

//Child class
class Maruthi extends Car{
   
    year: number

    constructor(name:string, color: string, model: string, year:number){ 
        super(name, color, color); 
        this.year = year;
    }

    //methods
    start(){ 
       console.log("Maruthi Started")
    }
   

    yom(){
       console.log(`Name: ${this.name} and Color: ${this.color} and model is : ${this.model} and Year of manufacturing : ${this.year}`)
    }
}

//Create object for Honda -- all methods and properties are called from child and parent class
let honda = new Honda("Honda City", "Black", "IVT", 2015);
honda.start(); //overriden method is called
honda.displayInformation();
honda.yom();
honda.stop(); //Parent class method

let maruti = new Maruthi("Ertiga", "While", "ZX", 2018);
maruti.start();
maruti.displayInformation();
maruti.stop();
maruti.yom();

//Parent class variable holding child class information

let car:Car = new Honda("Honda City", "Black", "IVT", 2015); // in above lines inference used to create let honda: Honda
car.displayInformation(); //available in parent class, so can access and accepted

car.start(); //overriden is executed

//car.yom() is not possible since implemented only child class and is not accessible
//Inheritanse comes in top to bottom and reverse is not possible i.e parent can hold child class variable and reverse is not possible
