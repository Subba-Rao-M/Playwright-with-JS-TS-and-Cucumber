/**
 * String - text value of combination of characters
 * String value is written inside ' or " or `
 * ` is used mainly to replace variable values inside string when used inside another string
 * every character represents index and index starts from 0
 * 
 */

//Declaration of Strings
let str1 = 'This is string with single quote';
let str2 = "This is string with double quote";
let str3 = `This is string with back tick`;

console.log(str1+str2+str3);

let num1: number =10;
console.log(" number is ", num1);
console.log(" number is ${num1}", num1);
console.log(`number is ${num1}`, num1);

// String Methods
let str : String = "Hello, Type Script";

//To find the lenght of string
console.log("Length of string", str.length); // length is not method its attribute of a string
//index starts from 0 but length gives how many characters available

//Converting to uppercase or lower case
console.log(str.toLowerCase());
console.log(str.toUpperCase());

//Characters - charAt and indexOf

console.log(str.charAt(5)); //,
console.log(str.indexOf("S")); //12
console.log(str.indexOf("Type")); //7

//substring - extracts some characters from original string

console.log(str.substring(3,5)); //lo 3 and 4 captured and 5 is exluded, end point is exclusive similar to array
console.log(str.substring(0,5));

//includes - returns true or false -in java we have contains for this

console.log(str.includes("abc"));
console.log(str.includes("Scr")); 

//startsWith and endsWith

console.log(str.startsWith("Hello")); //true
console.log(str.endsWith("script")); //Case sensitive false

// replace - replace a character or group of characters

console.log(str.replace("Type Script", "Java Script!")); //original string is not updated

//Split - break the string into multiple parts based on delimiter and returns an array

let splittedString: string[] = str1.split(" ");
console.log(splittedString);
for(str of splittedString){
    console.log(str);
}
for(str in splittedString){
    console.log(splittedString[str]);
}


let emails : string = "s@a.com,m@a.com";
console.log(emails.split(","));

//trim, trimstart, trimend
let trimString : string = " Hello ! ";
console.log(trimString.trim());
console.log(trimString.trimStart());
console.log(trimString.trimEnd());

//concat

console.log(str1+str2); //not recommended 
console.log(str1.concat(str2));
console.log("welcome ".concat(emails.split(",")[1].concat(" Also welcome : ").concat(emails.split(",")[1])));

//All string values are case sensitive
//String immutable and original value is not changes in all cases

//Concept of String immutability
//Original value is not getting updated is called immutability

//Multi line string - only possible through back tick ` operator

let multiline: string = `Welcome
to type script Ands
                    playwright

`;
console.log(multiline);