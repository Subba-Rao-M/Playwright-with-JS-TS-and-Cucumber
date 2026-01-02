/**
Class contains properties and methods
Class defines the structure
Using class create objects
**/

class Person{

    //Class variables
    ssn: string;
    firstName: string;
    lastName: string

    //Constructor is used to assign values to class variables and constructor does not return anything
    constructor(ssn: string, firstName:string, lastName: string){
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string{
        return `${this.firstName} ${this.lastName}`
    }

    getDetails(): string{
        return `SSN: ${this.ssn} and full name ${this.getFullName()}`;
    }
}

let person1 = new Person("11", "John", "Scena");
console.log(person1.getDetails());

//Create n number of objects