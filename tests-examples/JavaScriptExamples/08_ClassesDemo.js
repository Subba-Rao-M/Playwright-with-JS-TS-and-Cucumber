module.exports= class Person{

    age = 25;
    //country = "India";
    //if get is given it is property not method
    get Country(){
        return "India"
    }

    constructor(firstname, lastname){
        /** 
         * age is class variable
         * fistname and last name instant variables created while creating object
         * this refers to current class object and accessible in class
         * Scope of firstname is within this {} and this.firstName is entire class
         * All instant properties/variables are placed inside constructor
         * Class can be exported using module.exports and in another class call it using require
         */
        this.firstName = firstname;
        this.lastName = lastname;

       

       
    }
     //method
    fullname(){
        console.log(this.firstName+this.lastName);
    }
}

//Create object for above class
/*
let person = new Person();
person.age = 35;
console.log(person.age);
console.log(person.Country);

//Constructor is a method which executes when object is created for class

let person1 = new Person("Subba", "Rao");
console.log(person1.firstName);
person1.fullname()
*/