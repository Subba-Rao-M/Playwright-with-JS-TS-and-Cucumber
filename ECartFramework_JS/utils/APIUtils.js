class APIUtils{

    constructor(apicontext, loginPayLoad){
        this.apicontext = apicontext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){

        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        
         )
         const loginResponseJSON = await loginResponse.json();
         const token = loginResponseJSON.token;
         return token;
    }

    async createOrder(addProductPayLoad){
        let response = {};
        response.token = await this.getToken();
        const addProdResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: addProductPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type' : 'application/json'
                },
            }
        
         )
        const orderResponseJson = await addProdResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APIUtils};