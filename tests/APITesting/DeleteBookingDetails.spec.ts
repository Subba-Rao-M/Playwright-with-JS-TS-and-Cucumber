/*
1) create new booking
2) get booking
3) update booking  (token)
4) delete booking  (token)
*/

import { test, expect } from "@playwright/test";
import fs from 'fs';

// Utility function to read JSON data from file
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test.use({baseURL: 'https://restful-booker.herokuapp.com'});

test('Delete booking(end-to-end', { tag: ['@booking', '@api'] }, async ({ request }) => {

    //1) create new booking

    const postRequestBody = readJson('testdata/post_request_body.json');
    const postResponse = await request.post("/booking", { data: postRequestBody });
    const postResponseBody = await postResponse.json();  // Extractred response
    console.log(postResponseBody);
    const bookingId = postResponseBody.bookingid;
    console.log("Booking is created.....");
    console.log("Booking id===>", bookingId);

    //2) get booking

    const getResponse = await request.get(`/booking/${bookingId}`);
    const getResponseBody = await getResponse.json();
    console.log("Booking details are......");
    console.log(getResponseBody);

    //3) update booking  ( token)
    //creating token
    const tokenRequestBody = readJson('testdata/token_request_body.json');
    const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token ======>", token);

    //sending put request
    const updateRequestBody = readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingId}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: updateRequestBody
        }
    );

    const updateResponseBody = await updateResponse.json();
    console.log("Booking details updated succesfully...");
    console.log(updateResponseBody);

    //4) delete booking  

    const deleteResponse = await request.delete(`/booking/${bookingId}`,
        {
            headers: { "Cookie": `token=${token}` },
        });

    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201);

    console.log("Booking are deleted successfully.....");
});