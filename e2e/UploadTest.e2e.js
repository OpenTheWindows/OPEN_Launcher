describe("Upload picture page", () => {

  var LogInPage = require("./pages/LoginPageObject.js");
  var UploadPage = require("./pages/UploadPageObject.js");

  var loginUrl = "http://localhost:3000/#/login";
  var successMessage = "Сликата е успешно прикачена.";

  beforeEach(() => {
    browser.get(loginUrl);
    browser.sleep(1000);
    browser.ignoreSynchronization = true;
  });

  it("should not be possible to access the upload picture pages when user is not logged in", () => {
    expect(UploadPage.isNavigateToUploadPageVisible()).toBeFalsy();
  });

  it("should upload picture", () => {
    LogInPage.logIn();
    UploadPage.uploadPicture();
    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(UploadPage.returnAlertMessage()).toEqual(successMessage);
    browser.sleep(1000);
    browser.ignoreSynchronization = false;
    LogInPage.logOut();
  });

  it("should display the uploaded picture", () => {
    LogInPage.logIn();
    UploadPage.preUploadPicture();
    expect(UploadPage.isUploadPictureVisible()).toBeTruthy();
    LogInPage.logOut();
  });

  it("should display the choose picture button and it should be enabled", () => {
    LogInPage.logIn();
    UploadPage.navigateToUploadPage();
    expect(UploadPage.isChooseBtnEnabled()).toBeTruthy();
    LogInPage.logOut();
  });

  it("should display the upload button and it should be disabled when file is not selected", () => {
    LogInPage.logIn();
    UploadPage.navigateToUploadPage();
    expect(UploadPage.isUploadBtnEnabled()).toBeFalsy();
    LogInPage.logOut();
  });

  it("should display the image path field and it should be disabled when picture is not choosen", () => {
    LogInPage.logIn();
    UploadPage.navigateToUploadPage();
    expect(UploadPage.isPathFieldEnabled()).toBeFalsy();
    LogInPage.logOut();
  });
});




