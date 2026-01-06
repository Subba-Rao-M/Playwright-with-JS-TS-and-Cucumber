/*

Pre-requisites:
    data: json file
    create token

1) Create a booking (Post) ---> bookingId
2) Update booking (Put)   // required token

*/

import { test, expect } from "@playwright/test";
import fs from 'fs';

test.use({baseURL: 'https://restful-booker.herokuapp.com'});

//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Update Booking(Put)', { tag: ['@booking', '@api'] }, async ({ request }) => {

    //1) Create a booking (Post) ---> bookingId

    const requestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('/booking', { data: requestBody });

    //expect(createResponse.ok()).toBeTruthy();

    const responsebody = await createResponse.json();
    console.log(responsebody);
    const bookingId = responsebody.bookingid;   // extracting bookingid from the response body
    console.log("Booking id======>", bookingId);

    //2) Update booking (Put)   // required token

    //token creation
    const tokenRequestBody = readJson('testdata/token_request_body.json');
    const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
    expect(tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token ======>", token);

    //sending update(Put)
    const updateRequestbody = readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingId}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: updateRequestbody
        }
    );

    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
    console.log("Booking details updated succesfully...");

});



