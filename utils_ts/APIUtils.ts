export class APIUtils{
    apicontext: any;
    loginPayLoad: string;

    constructor(apicontext: any, loginPayLoad: string){
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

    async createOrder(addProductPayLoad: string){
        let response = {token: String, orderId: String};
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
