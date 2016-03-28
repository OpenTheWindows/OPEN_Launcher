import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from 'angular2/testing';

import {provide, Injector, Component} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {RouterLink, Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User, Users} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {UserSettingsEditComponent} from './UserSettingsEditComponent';
import {AuthService} from '../../shared/services/AuthService';
import {Alert} from '../alerting/Alert';

describe('UserSettingsEditComponent', function() {
  class ImagesServiceMock {
    getProfileImages() {
      var string1 = '["./app/assets/images/avatars/default.jpg", "./app/assets/images/avatars/devojce.png"]';
      var obj = JSON.parse(string1);
      return Observable.of(obj);
    }
  }

  class UserServiceMock {
    addUser(user: User) { }
  }

  class AlertingServiceMock {
    addDanger(message: string) {

    }

    addSuccess(message: string) {

    }
  }

  class RouterMock {
    navigate(urlList: Array<String>) {

    }
  }

  var injector: Injector;
  var instance: UserSettingsEditComponent = null;
  var _imagesService: ImagesService;
  var _userService: UserService;
  var _userSettingsService: UserSettingsService;
  var _alertingService: AlertingService;
  var _authService: AuthService;
  var _router: Router;
  var _userValidationService: UserValidationService;
  var _formBuilder: FormBuilder;

  beforeEach(() => {
    injector = Injector.resolveAndCreate([
      provide(ImagesService, { useClass: ImagesServiceMock }),
      provide(UserService, { useClass: UserServiceMock }),
      provide(AlertingService, { useClass: AlertingServiceMock }),
      provide(Router, { useClass: RouterMock }),
      UserValidationService
    ]);

    _imagesService = injector.get(ImagesService);
    _userService = injector.get(UserService);
    _alertingService = injector.get(AlertingService);
    _router = injector.get(Router);
    _userValidationService = injector.get(UserValidationService);
    _formBuilder = injector.get(FormBuilder);

    spyOn(_router, 'navigate').and.callThrough();
    spyOn(_alertingService, 'addSuccess').and.callThrough();
    spyOn(_alertingService, 'addDanger').and.callThrough();

    instance = new UserSettingsEditComponent(_alertingService, _authService, _userSettingsService);

  });

  it('UserSettingsEditComponent_saveUserSettings_SuccessfullySavedUserSettings', function() {
    // Arrange

    // Act


    // Assert
    expect(_router.navigate).toHaveBeenCalledWith(['/Login']);
    expect(_alertingService.addSuccess).toHaveBeenCalledWith('Корисничките подесувања се успешно зачувани.');
  });

});
