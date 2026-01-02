/**
 *Type Aliases - Declare one time object structure use it multiple times

//For another student same structure needs to be repeated 
//Problem duplicate code
//To avoid this problem we have aliase
type is used while creating object structure


 */

type product= {
    name: string,
    price: number,
    getinfo: ()=> string
};


let book1: product = {
    name: "Java",
    price: 200.50,
    getinfo: function() {
        return `${this.name} book has price of ${this.price}`;
    }
}


let book2: product = {
    name: "Python",
    price: 201.50,
    getinfo: function() {
        return `${this.name} book has price of ${this.price}`;
    }
}

console.log(book1.getinfo());
console.log(book2.getinfo());


type personal= {
    name: string,
    age: number
}

type contact = {
    phone : number,
    email : string
}

type candidate = personal & contact & { // gets properties from personal and contact objects
    getContactInfo: ()=> string;
}

let cand : candidate = {
    name:  "Scott",
    age: 30,
    phone: 9901901280,
    email : "a@a.com",
    getContactInfo: function(){
        return `${this.name} has phone number ${this.phone} and email ${this.email}`;
    }
}

console.log(cand.getContactInfo());