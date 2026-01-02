/**
 *
 *  Problem without page object model
 * Duplicate elements and actions
 * Updation is problem in multiple places
 * 
 *  page object model pattern
 * supports re-usability, readability, maintainability
 * Each Page has separate class with elements/locators and actions associated with locators related to that page
 * Each page will follow structure variables(private and readonly), construcotr and methods
 * Follow the naming convention consistantly throughout project so that others can easily recognize
 * example: userNameInput, loginLink, loginButton
 * constructor has reference to this.page and this.page.locators
 * async methodname(){operate on locators using await this.locator.action}
 * Dont create assertions inside page class, it should be part of test case spec file
 * Create N number tests that interact with above page object classes created
 * 
 * 
 * 
 * 
 */