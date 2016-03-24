var LogInPage = function() {



  var signBtn = element(by.id("btn-login"));
  var profile = element.all(by.className("img-circle"));
  var logOutbtn = element(by.id("logout"));
  var name = element(by.id("usernamefield"));
  var filtered_names = element.all(by.css("body > app > div > login > div > div > div:nth-child(2) > div")).get(0);
  var loggedUser = element(by.css("body > app > div > home > div > div > b"));
  var profileNumber;
  var randomNo;
  var profileNames;
  var selectedName;
  var loggedUsername;


  this.get = function(value) {
    browser.get(value);
  };

  this.LogIn = function() {
    profile.count().then(function(counted) {
      console.log(counted);
      profileNumber = parseInt(counted);
      console.log("Profilenumber: " + profileNumber);
      randomNo = Math.floor(Math.random() * (profileNumber - 1));
      profileNames = element.all(by.className("text-overflow")).get(randomNo);
      profileNames.getAttribute("innerHTML").then(function(text) {
        selectedName = text;
        console.log("Random number: " + randomNo);
        console.log("Selected user:" + selectedName);
        profile.get(randomNo).click();
        signBtn.click();
      });
    });

  };


  this.LogOut = function() {
    logOutbtn.click();
  };

  this.getCurrentURL = function() {
    return browser.getCurrentUrl();
  };

  this.FilterUsername = function(filter) {
    name.sendKeys(filter);

  }

  this.FilterUsernameClear = function(filter) {
    name.clear();

  }
  this.GetTextFromFilter = function() {
    return filtered_names.getText();
  }

  this.signBtnIsVisible = function() {
    return signBtn.isPresent();
  }

  this.GetLoggedUser = function() {
    loggedUser.getAttribute("innerHTML").then(function(text) {
      loggedUsername = text;
      console.log("User logged in: " + loggedUsername);
      return loggedUsername;
    });
  };

  this.GetSelectedUser = function() {
    return selectedName;
  };

  this.GetTitle = function() {
    return browser.getTitle();
  }



};

module.exports = new LogInPage();
