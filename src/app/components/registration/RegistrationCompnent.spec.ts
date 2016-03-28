import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from 'angular2/testing';

import {provide, Component} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User, Users} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {RegisterComponent} from './RegisterComponent';
import {Alert} from '../alerting/Alert';

describe('RegisterComponent', function() {
  var instance: RegisterComponent = null;

  function setUser(user: User): User {
    user.name = 'eljesa';
    user.profileImg = 'PATH';
    return user;
  }

  function getAllUsers(user: User): User[] {
    var user1 = new User();
    user1.name = 'a';
    user1.profileImg = 'aa';
    var user2 = new User();
    user2.name = 'b';
    user2.profileImg = 'bb';
    var allUsers: User[] = new Array<User>();
    allUsers[0] = user1;
    allUsers[1] = user2;
    allUsers[2] = new User();
    allUsers[2].name = user.name;
    allUsers[2].profileImg = user.profileImg;

    return allUsers;
  }

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
    addDanger(message: string) { }
    addSuccess(message: string) { }
  }

  class RouterMock {
    navigate(urlList: Array<String>) { }
  }

  beforeEachProviders(() => [
    provide(AlertingService, { useClass: AlertingServiceMock }),
    provide(ImagesService, { useClass: ImagesServiceMock }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(UserValidationService, { useClass: UserValidationService }),
    provide(Router, { useClass: RouterMock }),
    FormBuilder,
    RegisterComponent
  ]);

  it('RegisterComponent_getAvailableImages_returnJSONOfImagesFiles',
    inject([RegisterComponent], (instance) => {
      // Act
      var allImagesLocal: string[] = new Array<string>();
      allImagesLocal = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];

      // Assert
      expect(instance.allImages).toEqual(allImagesLocal);
    }));

  it('RegisterComponent_onSelect_shouldbeEljesa',
    inject([RegisterComponent], (instance) => {
      //act
      instance.onSelect('eljesa');
      //assert
      expect(instance.user.profileImg).toBe('eljesa');
    }));

  it('RegisterComponent_onSelect_shouldBeDefaultPath',
    inject([RegisterComponent], (instance) => {
      //assert
      expect(instance.user.profileImg).toBe('./assets/images/avatars/default.jpg');
    }));

  it('RegisterComponent_adduser_shouldAddUserAndReturnUsersAndEmptyMessage',
    inject([RegisterComponent], (instance) => {
      //Arrange
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.alertingService, 'addSuccess').and.callThrough();
      spyOn(instance.userService, 'addUser').and.callFake(function(user) {

      var response: Users = new Users(getAllUsers(user));
        return Observable.of({ users: response.users, message: '' });
      });

      //Act
      let user: User = new User();
      instance.user = setUser(user);
      instance.onSubmit();

      //Assert
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Успешно внесен корисник.');
    }));

  it('RegisterComponent_addUser_ExsitingName_ShouldNotAddAndWriteMessage',
    inject([RegisterComponent], (instance) => {
      //Arrange
      spyOn(instance.alertingService, 'addDanger').and.callThrough();
      spyOn(instance.userService, 'addUser').and.callFake(function(user) {
        var response: Users = new Users(getAllUsers(user));
        return Observable.of({ users: response.users, message: 'Name exists' });
      });

      //Act
      let user: User = new User();
      instance.user = setUser(user);
      instance.onSubmit();

      //Assert
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисничкото име веќе постои, обидете се да се регистрирате со друго име');
    }));

  it('RegisterComponent_addUser_ShouldNotAddAndShouldReturnAllUsersWithWrittenMessage',
    inject([RegisterComponent], (instance) => {
      //Arrange
      spyOn(instance.alertingService, 'addDanger').and.callThrough();
      //Act
      let user: User = new User();
      user.name = 'eljesa';
      user.profileImg = './assets/images/avatars/default.jpg';

      instance.user = user;
      instance.onSubmit();

      //Assert
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('За да креирате профил, ве молам изберете слика');
    }));
});
