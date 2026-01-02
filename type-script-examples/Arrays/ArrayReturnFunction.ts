//Function returns upper case converted array
//Function takes array as input and also returns array

function capitalizeWord(arr:string[]): string[]{

    let result: string[]=[];

    for(let i=0; i< arr.length; i++){
        console.log(arr[i]);
        result[i]= arr[i].toUpperCase();
    }
    return result;
}

let pname:string[] = ["Scott", "Tom", "Jerry", "Livermol"];
let uname: string[] = capitalizeWord(pname);

console.log(uname);
