import Person from './Person.js';

class Student extends Person {

    constructor(name, age, grade) {
        super(name, age); // Call the parent class constructor  
        this.grade = grade;
    }

    getStudentDetails() {
        const parentDetails = super.getDetails(); // Call the parent class method
        return `${parentDetails}, Grade: ${this.grade}`;
    }
}


export default Student;