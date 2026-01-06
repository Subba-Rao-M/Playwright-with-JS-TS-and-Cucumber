/*

Pre-requisites:
    data: json file
    create token

1) Create a booking (Post) ---> bookingId
2) Partial Update booking (Patch)   // required token

*/

import { test, expect } from "@playwright/test";
import fs from 'fs';

test.use({baseURL: 'https://restful-booker.herokuapp.com'});

//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Partial Update Booking(Patch)', { tag: ['@booking', '@api'] }, async ({ request }) => {

    //1) Create a booking (Post) ---> bookingId

    const requestBody = readJson('testdata/post_request_body.json');

    const createResponse = await request.post('/booking', { data: requestBody });

    //expect(createResponse.ok()).toBeTruthy();

    const responseBody = await createResponse.json();

    console.log(responseBody);
    const bookingId = responseBody.bookingid;   // extracting bookingid from the response body
    console.log("Booking id======>", bookingId);

    //2) Partial Update booking (Patch)   // required token
    //token creation
    const tokenRequestBody = readJson('testdata/token_request_body.json');
    const tokenResponse = await request.post('/auth', { data: tokenRequestBody });
    expect(tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token ======>", token);

    //sending update(Put)
    const patchRequestBody = readJson('testdata/patch_request_body.json');
    const partialUpdateResponse = await request.patch(`/booking/${bookingId}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: patchRequestBody
        }
    );

    expect(partialUpdateResponse.ok()).toBeTruthy();
    expect(partialUpdateResponse.status()).toBe(200);

    const partialUpdateResponseBody = await partialUpdateResponse.json();
    console.log(partialUpdateResponseBody);
    console.log("Booking details updated succesfully...");

});



