const {test, expect} = require('@playwright/test');

const baseURL = "https://reqres.in/api/";
var userID;

test('test get method', async ({request})=>{
    const response = await request.get(baseURL+'users?page=2');
    console.log(await response.json());
    expect(await response.status()).toBe(200);

});

test('test post method', async ({request})=>{
    const response = await request.post(baseURL+'users',
                                        {
                                            data:
                                            {
                                                "name" : "SUbba",
                                                "job" : "tester"

                                            },
                                            headers: 
                                            {
                                                "Accept" : "application/json"
                                            }

                                        }
    );
    console.log(await response.json());
    expect(await response.status()).toBe(201);

    var res = await response.json();
    userID = res.id;

});

test('test put method', async ({request})=>{
    const response = await request.put(baseURL+'users/'+userID,
                                        {
                                            data:
                                            {
                                                "name" : "SUbba",
                                                "job" : "Developer"

                                            },
                                            headers: 
                                            {
                                                "Accept" : "application/json"
                                            }

                                        }
    );
    console.log(await response.json());
    expect(await response.status()).toBe(200);
});

test('test delete method', async ({request})=>{

    const response = await request.delete(baseURL+'users/'+userID);
    expect(await response.status()).toBe(204);
});