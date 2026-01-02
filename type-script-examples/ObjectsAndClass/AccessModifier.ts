/**
 * Only 3 types in TS
 * public, protected and private
 * scope of properties or methods
 */

class Person{
   public name: string; //by default public even if it is not specified and accessible anywhere
   protected age: number; //access within class and child class
   private ssn: number; //accessible within class only and in child class also cannot access

   constructor(name: string, age: number, ssn: number){
    this.name =name;
    this.age = age;
    this.ssn = ssn;
   }

   displayInfo(){
    console.log(this.name);
    console.log(this.age);
    console.log(this.ssn);
   }
}

class Employee extends Person{
    private empId: number;

    constructor(name: string, age: number, ssn: number, empId:number){
        super(name, age, ssn);
        this.empId = empId;
    }

    showEmpDetails(){
        console.log(this.name);
        console.log(this.age);
       // console.log(this.ssn); //cannot access
        console.log(this.empId);
    }

}

let emp = new Employee("John", 30, 1231212, 42342);
emp.displayInfo();
emp.showEmpDetails();

console.log(emp.name);
//console.log(emp.age); //Protected outside class is not accessed

//Access modifier in similar way can be applied to methods, but dont make methods as private and by default it is public and dont change it