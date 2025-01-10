@ProductsTest
Feature: Placing the order and view order history

    @E2ETest
    Scenario: Successful Order placement and order history verification
        Given User login to application using "subbaraw@gmail.com" and "Span@1234"
        When user adds product "IPHONE 13 PRO" to cart
        Then verify "IPHONE 13 PRO" is displayed in cart
        When user enter the valid details and place the order
        Then verify the order is present in user order history

    @DataDrivenTest
    Scenario Outline: Successful Order placement and order history verification
        Given User login to application using "<username>" and "<password>"
        When user adds product "<productname>" to cart
        Then verify "<productname>" is displayed in cart
        When user enter the valid details and place the order
        Then verify the order is present in user order history

        Examples:
            | username           | password  | productname     |
            | subbaraw@gmail.com | Span@1234 | IPHONE 13 PRO   |
            | subbaraw@gmail.com | Span@1234 | ADIDAS ORIGINAL |
