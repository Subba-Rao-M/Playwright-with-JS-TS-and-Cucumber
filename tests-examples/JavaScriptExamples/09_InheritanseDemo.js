/**
 * One class called sub-class inherits properties of another class called super class or parent class
 * 
 */

const Person = require('./08_ClassesDemo');

class Pet extends Person

{

    get location(){
        return "RedCross";
    }

    constructor(firstName, lastName){
        super(firstName, lastName);
    }

}

let pet = new Pet("Rocky", "Test");
pet.fullname();
console.log(pet.location);