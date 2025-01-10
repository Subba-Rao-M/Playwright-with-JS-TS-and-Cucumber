var productPrices = [45, 89, 32.50, 65.99];
 
// Apply 10% discount
var discountedPrices = productPrices.map(price => price * 0.9);
 
// Products under $50
var affordableProducts = productPrices.filter(price => price < 50);
 
// Total cost of affordable products
var totalCost = affordableProducts.reduce((sum, price) => sum + price, 0);
 
console.log(discountedPrices);
console.log(affordableProducts);
console.log(totalCost);