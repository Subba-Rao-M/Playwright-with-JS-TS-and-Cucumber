/**
 * interfaces helps to define the structure of object
 * supports inheritance
 * interfaces can also used to create objects
 * interface contains only properties and methods and no constructor
 * methods are abstract - only signature of method and no implementation
 * interface is implemented using class
 * 
 * interface interfaceName{
 * properties
 * abstract methods
 * }
 * 
 * Supports:
 * regular properties
 * optional properties
 * read only properties and function types
 * extending interfaces
 * class implemeting interfaces
 * 
 */


//Example 1: Basic interface with regular properties
interface Person{
    //Regular Properties
    name: string;
    age: number;
}

let student: Person = { name: "John", age: 30};
console.log(student.name);
console.log(student.age);
console.log(student);

//Example 2: interface with optional properties

interface Employee{
    eid: number,
    ename: string,
    edepartment ?: string
}

let emp: Employee = {eid:1, ename: "Scott"};
//let emp: Employee = {eid:1, ename: "Scott", edepartment: "QA"}
console.log(emp.eid);
console.log(emp.ename);
console.log(emp.edepartment);


//Example 3:  interface with read only properties - value is assinged once and then it cannot be modified
// along with abstract method

interface Book{
    title: string,
    readonly isbn: string,
    display(): void //return type is optional
}

let b1: Book = {title: "Learn Playwright", isbn: "LPU12", display(){
    console.log(`title is ${b1.title} and isbn ${b1.isbn} `)
}};
console.log(b1.title);
console.log(b1.isbn);
b1.display();

console.log(" after updating values");
b1.title = "Learn JS";
console.log(b1.title);
//b1.isbn = "ewuyui"; // not allowed for read only property

//Only read only and static will work with interfaces and access modifiers are not allowed in interfaces

//Example 4: Extending interface i.e inheritanse

interface Animal{
    name: string;
}

interface Dog extends Animal{

    //static modifier is not accepted in properties
    color : string;
}

let myDog = {name: "Rocky", color: "Brown"};

console.log(myDog.color);
console.log(myDog.name);

//Example 5: class extends antoher class, interface extends another interface and class can only implement interfaces

interface Animal1{
    name: string;
    sound(): void;
}

class Dog implements Animal1{
    
   name: string;//Propery declaration is mandatory and same as interface and inherited here
   color: string //class property not inherited
    constructor(name: string, color: string){
        this.name = name;
        this.color = color;
    }
//Abstract method implementation is mandatory
    sound(): void{
        console.log("Bark")
    }
}

let dog = new Dog("Rocky", 'Brown');
console.log(dog.name);
console.log(dog.color);
dog.sound();