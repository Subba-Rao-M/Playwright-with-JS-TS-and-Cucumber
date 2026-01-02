/**
 * super is available as method and as keyword
 * super is used to invoke parent method
 * invoking variable is not possible as in JS and TS variables are referred as properties
 * 
 */

class Parent {
    num: number = 10;

    constructor(){
        console.log(" THis is parent class constructor");
    }

    display(){
        console.log(" This is display method from parent class");
    }
}

class Child extends Parent{
    //Property overriding
     num: number = 20;
      
     constructor(){
        super(); //invoke parent class constructor and must be called
        console.log(" THis is child class constructor");
    }

    show(){
        console.log(" THis is show method from child class")
    }

     display(){
        super.display(); // this will invoke parent class method
        console.log(" This is display method from child class");
    }
}

let superdemo = new Child();//First child construcotr invoked and it in turn invokes parent class constructor
superdemo.show();
superdemo.display(); //child class
