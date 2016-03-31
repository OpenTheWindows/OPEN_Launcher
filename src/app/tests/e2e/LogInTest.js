describe("Game menu log in page", function() {


  var LogInPage = require("../page/LoginPageObject.js");


  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
  });


  it("should display log in page", function() {
    expect(LogInPage.getTitle()).toEqual("OPEN");
  });


  it("sign in button should not be visible if profile is not selected", function() {
    expect(LogInPage.signBtnIsVisible()).toBe(false);
    console.log("sign in button should not be visible if profile is not selected");
  });

  it("User can log in when selecting existing profile ", function() {
    LogInPage.logIn();
    expect(LogInPage.getLoggedUser()).toEqual(LogInPage.getSelectedUser());
    expect(LogInPage.getCurrentURL()).toEqual("http://localhost:3000/#/home");
    LogInPage.logOut();
    console.log("Finishing : User loged in");
  });

  it("User can log out from home page ", function() {
    LogInPage.logIn();
    LogInPage.logOut();
    expect(LogInPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Finishing : User loged out");
  });


  it("should filter profiles by entering username", function() {
    LogInPage.filterUsername("Auto");
    expect(LogInPage.getTextFromFilter()).toContain("Auto");
    LogInPage.filterUsernameClear();
    console.log("Finishing : Filter username");

  });


});

