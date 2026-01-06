import { test, expect } from "@playwright/test";

test.use({baseURL: 'https://restful-booker.herokuapp.com'});

test('Get booking details by Id- path param', {tag: ['@booking', '@api']}, async ({ request }) => {

    const bookingId = 256; // we can this as path parameter

    //sending get request along with path parameter
    const response = await request.get(`/booking/${bookingId}`);

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

});


test('Get booking details by Name- query params', {tag: ['@booking', '@api']}, async ({ request }) => {

    const firstName = "Jim";
    const lastName = "Brown";

    //sending get request along with query parameters
    const response = await request.get("/booking", {
        params:
        {
            firstName,
            lastName
        }
    });

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //check response should not be empty
    expect(responseBody.length).toBeGreaterThan(0);

    for(const item of responseBody)
    {
        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }

});