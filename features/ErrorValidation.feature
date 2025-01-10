@LoginPageTest
Feature: Login Test
  @ValidationTest
  Scenario: Verify error message on entering invalid password
    Given User login to application using "subbaraw@gmail.com" and "Span@12341"
    Then Error message should be displayed