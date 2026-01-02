/**
 *inline type object - we will also specify data types for keys - Only for typescript 
 */

let student: {
    name: string,
    sid: number,
    age: number,
    grade: string,
    getSummary: ()=>string
    }=
    {
        name: "Scott",
        sid: 101,
        age: 15,
        grade: 'A',
        getSummary: function(){
            return `${this.sid} belongs to ${this.name}`
        }

    }



console.log("accessing object approach 1 - using . notation")
console.log(student.name);
console.log(student.age);
console.log(student.getSummary())

//For another student same structure needs to be repeated 
//Problem duplicate code
//To avoid this problem we have aliase