// 8. Named function with optional parameters. Add ? fpr optional parameter
function displayDetails(id: number, name: string, emailId?: string){
console.log("ID: "+id+ " name: "+name+" email id: "+emailId)
if(emailId!=undefined){
    console.log(emailId)
}
}

displayDetails(123, "Scott", "Scott@email.com")
displayDetails(123, "Scott")
