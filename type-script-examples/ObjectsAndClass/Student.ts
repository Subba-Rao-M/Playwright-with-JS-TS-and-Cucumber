/**
 * Class
 * read only property
 * optional property
 * 
 * 
 *  static variables and methos
 *  static properties or mehods common across all objects
 *  can be accessed through class name directly
 *  static property or method can be updated using any object and it reflects for all objects
 */

class Student {

    //Properties
    readonly studentId: number; //read only property assigned - can assign value once only through constructor, cannot change or modify the values
    name: string; //regular property
    email?: string // ? indicates optional property. if no value assigned by default it takes undefined
   static schoolName: string = "SDM"; //static should have initialization

//Constructor
    constructor(id:number, name: string, email?: string){
        this.studentId = id;
        this.name = name;
        this.email = email; // if email is not passed, it will undefined
    }

//Methods

displayInfo(): void{
    
    if(this.email){
        console.log(`Student ID: ${this.studentId}, Student Name: ${this.name}, Email: ${this.email}, School: ${Student.schoolName}`)
    }
    else {
        console.log(`Student ID: ${this.studentId}, Student Name: ${this.name}, School: ${Student.schoolName} `)
    }
}

static changeSchoolName(newName: string): void{
    Student.schoolName = newName;
}

}

let s1 = new Student(1, "Scott");
s1.displayInfo();

let s2 = new Student(2, "Arvid", "A@a.com");
s2.displayInfo();


//Try to modify the propertis of s1 object
//s1.studentId = 3;
s1.name = "Scottes";
s1.email = "scots@a.com"
s1.displayInfo();

//Static is applicable for both properties and methods
//If property or method is common for multiple objects, then make it static
// static will make it shared property or method across all objects 
//Static should be accessed via class name for updating or retrival of value as it is shared across all objects

Student.changeSchoolName("SDM School");
s1.displayInfo();
s2.displayInfo();
