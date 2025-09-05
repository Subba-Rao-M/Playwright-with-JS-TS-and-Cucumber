function fetchData(callback) {
    // promise can have status: pending, fulfilled, rejected
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Data fetched");
        const data = "Sample Data";
        if (!data) {
        reject("No data found");
        }
        resolve(data);
    }, 2000);  
});
}

fetchData().then(function(data){
    console.log("Processing: " + data);
});

const data = await fetchData();
console.log("Displaying: " + data);

//await can only be used inside async function and it internally peforms above .then() operation