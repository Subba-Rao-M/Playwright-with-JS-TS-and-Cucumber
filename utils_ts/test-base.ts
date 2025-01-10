import {test as basetest} from '@playwright/test';

/** create an interface for test data order data types */
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};

/** Pass the data order as parameter which we are going to extend and the type of it is interface created above */
export const customtest = basetest.extend<{testDataForOrder:TestDataForOrder} >(
    {
    testDataForOrder: {
            username : "subbaraw@gmail.com",
            password : "Span@1234",
            productName : "IPHONE 13 PRO"
        }

    }


);
