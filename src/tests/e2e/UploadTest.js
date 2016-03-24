describe("Upload picture page", function() {


  var UploadPage = require("../page/UploadPageObject.js");
  var LogInPage = require("../page/LoginPageObject.js");



  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
  });

  it("Logged user can upload picture ", function() {

    LogInPage.LogIn();
    UploadPage.UploadPicture();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(UploadPage.ReturnMessage()).toEqual("Сликата е успешно додадена!");
    browser.sleep(500);
    browser.ignoreSynchronization = false;
    UploadPage.NavigateToHomePage();
    LogInPage.LogOut();
    console.log("Finishing: Logged user can upload picture");
  });

  it("Upload picture page not available if user is not logged in ", function() {
    UploadPage.NavigateToUploadPage();
    expect(UploadPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("Upload picture page not available if user is not logged in");
  });

  it("Choose picture button should be enabled when user is navigated to Upload page", function() {
    LogInPage.LogIn();
    UploadPage.NavigateToUploadPage();
    expect(UploadPage.isChooseBtnEnabled()).toBe(true);
    console.log("Choose picture button should be enabled when user is navigated to Upload page");
  });

  it("Upload button should be disabled if file is not selected", function() {
    LogInPage.LogIn();
    UploadPage.NavigateToUploadPage();
    expect(UploadPage.isUploadBtnEnabled()).toBe(false);
    console.log("Upload button should be disabled if file is not selected");
  });

  it("Path field should be disabled when user is navigated to upload page", function() {
    LogInPage.LogIn();
    UploadPage.NavigateToUploadPage();
    expect(UploadPage.isPathFieldEnabled()).toBe(false);
    console.log("Path field should be disabled when user is navigated to upload page");
  });


  it("User can navigate from upload to log in page", function() {
    UploadPage.NavigateToLogInPage();
    expect(UploadPage.getCurrentURL()).toEqual("http://localhost:3000/#/login");
    console.log("User can navigate from upload to log in page");
  });

  it("User can navigate from upload to home page", function() {
    UploadPage.NavigateToHomePage();
    expect(UploadPage.getCurrentURL()).toEqual("http://localhost:3000/#/home");
    console.log("User can navigate from upload to home page");
  });


});




