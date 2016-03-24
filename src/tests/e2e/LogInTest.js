describe("Game menu log in page", function() {


  var LogInPage = require("../page/LoginPageObject.js");


  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
  });


  it("should display log in page", function() {
    expect(LogInPage.GetTitle()).toEqual("OPEN");
  });


  it("sign in button should not be visible if profile is not selected", function() {
    expect(LogInPage.signBtnIsVisible()).toBe(false);
    console.log("sign in button should not be visible if profile is not selected");
  });

  it("User can log in when selecting existing profile ", function() {
    LogInPage.LogIn();
    expect(LogInPage.GetLoggedUser()).toEqual(LogInPage.GetSelectedUser());
    expect(LogInPage.getCurrentURL()).toEqual("http://localhost:3000/#/home");
    LogInPage.LogOut();
    console.log("Finishing : User loged in");
  });

  it("User can log out from home page ", function() {
    LogInPage.LogIn();
    LogInPage.LogOut();
    expect(LogInPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Finishing : User loged out");
  });


  it("should filter profiles by entering username", function() {
    LogInPage.FilterUsername("Auto");
    expect(LogInPage.GetTextFromFilter()).toContain("Auto");
    LogInPage.FilterUsernameClear();
    console.log("Finishing : Filter username");

  });


});

