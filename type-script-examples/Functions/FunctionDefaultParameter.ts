//9. Named function with default parameters

function calculateDiscount(price: number, rate:number=0.50){

    let discount = price* rate;
    console.log("Discount Amount:   ", discount)

}

calculateDiscount(1000, 0.30); //300 // Default value is overriden 
calculateDiscount(1000) //500 default value is considered for parameter