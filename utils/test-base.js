const base = require('@playwright/test');

/** above in place of test base is given as object name
 * Similar to page and browser user can create custom fixtutes
 * test data order below is custom fixture created using base test object
 * Below is exported using proprty test and it is visible for all tests

 */

exports.customtest = base.test.extend(
    {
        testDataOrder: {
            username : "subbaraw@gmail.com",
            password : "Span@1234",
            productName : "IPHONE 13 PRO"
        }

    }


);
