/**
 * object is a collection of properties like person having name, gender, age, address, phone no, email
 */
const Person = require('./08_ClassesDemo')
let person ={
 firstname : "Subba",
 lastname : "rao",
 gender : "male",
 age: 35,
 employed: true,
 fullname : function(){
    console.log(this.firstname+this.lastname)
 }

}
person.fullname();
console.log(person.firstname);
console.log(person['lastname']);

//To update the person first name

person['firstname'] = "Subba M";
console.log(person.firstname);

//Add the new property
//If property is available it will update it and if it is not available it will create new record
person.email = "subba@rao.com";
console.log(person);

//TO delete a property
delete person.gender;
console.log(person);

//To check the property exists or not
console.log('gender' in person) ; //checks if gender property exists

//To iterate over all elements in a object

for(let key in person){
    console.log(person[key]);
}


let person2 = new Person('Chris', 'Demo');
person2.fullname();
