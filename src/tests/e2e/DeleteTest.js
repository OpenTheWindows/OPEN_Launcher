describe("Game menu delete user", function() {


  var DeleteUser = require("../page/DeletePageObject.js");



  beforeEach(function() {
    console.log(" Method started");
    browser.get("http://localhost:3000/#/login");
    browser.sleep(500);
    browser.ignoreSynchronization = true;
  });

  afterAll(function() {
    browser.sleep(500);
    browser.ignoreSynchronization = false;
  });

  it("should return to the profile page and alert to be displayed", function() {
    DeleteUser.CancelDelete();
    expect(DeleteUser.ReturnMessage()).toEqual("Бришењето е откажано.");
    console.log("Finishing :Cancel Delete profile");
  });

  it("should delete profile and remove it from the profile page and alert to be displayed", function() {
    DeleteUser.DeleteProfile();
    expect(DeleteUser.ReturnMessage()).toEqual("Профилот е успешно избришан.");
    console.log("Finishing : Delete profile");
  });

  it("delete button should not be visible if profile is not selected", function() {
    expect(DeleteUser.IsDeleteBtnIsVisible()).toBe(false);
    console.log("delete button should not be visible if profile is not selected");
  });

});





