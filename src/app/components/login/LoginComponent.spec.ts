import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture
} from 'angular2/testing';

import {provide, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Router} from 'angular2/router';

import {User} from '../../shared/models/User';
import {AuthService} from '../../shared/services/AuthService';
import {UserService} from '../../shared/services/UserService';
import {AlertingService} from '../alerting/AlertingService';
import {LoginComponent} from './LoginComponent';
import {Alert} from '../alerting/Alert';

describe('LoginComponent', function() {
  var instance: LoginComponent = null;

  function getTestUser(name) {
    var user = new User();
    user.name = name;
    return user;
  }

  function getAllUsers() {
    var user1 = new User();
    user1.name = 'user1';
    var user2 = new User();
    user2.name = 'user2';
    var allUsers: User[] = new Array<User>();
    allUsers[0] = user1;
    allUsers[1] = user2;
    return allUsers;
  }

  class UserServiceMock {
    deleteUser(name) {
      var allUsers = getAllUsers();
      return Observable.of(allUsers);
    }

    getAllUsers() {
      var string1 = '[{"name": "Daniela", "profileImg":"danielImg"},{"name": "Daniela1", "profileImg":"danielImg1"}]';
      var obj = JSON.parse(string1);
      return Observable.of(obj);
    }
  }

  class AlertingServiceMock {
    addDanger() { }
    addSuccess() { }
    addInfo() { }
  }

  class AuthServiceMock {
    login() { }
  }

  class RouterMock {
    navigate() { }
  }

  beforeEachProviders(() => [
    provide(AlertingService, { useClass: AlertingServiceMock }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(AuthService, { useClass: AuthServiceMock }),
    provide(Router, { useClass: RouterMock }),
    LoginComponent
  ]);

  it('Login_GivenInavlidUser_UnsuccessfulLogin',
    inject([LoginComponent], (instance) => {
      //Arrange
      var user = getTestUser('user');

      //Act
      spyOn(instance.alertingService, 'addDanger').and.callThrough();
      spyOn(instance.authService, 'login').and.callFake(function() { return false; });
      instance.selectUser(user);
      instance.login();

      //Assert
      expect(instance.authService.login).toHaveBeenCalledWith(user.name);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисникот не е валиден.');
    }));

  it('Login_GivenValidUser_SuccessfulLogin',
    inject([LoginComponent], (instance) => {
      //Arrange
      var user = getTestUser('user');

      //Act
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.authService, 'login').and.callFake(function() { return true; });
      instance.selectUser(user);
      instance.login();

      //Assert
      expect(instance.authService.login).toHaveBeenCalledWith(user.name);
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Home']);
    }));

  it('DeleteUser_GivenSelectedUser_DeletesTheSelectedUser',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = getTestUser('user');
      var allUsers = getAllUsers();

      // Act
      instance.selectedUser = user;
      instance.deleteUser();

      // Assert
      expect(instance.allUsers).toEqual(allUsers);
    }));

  it('DeleteUser_GivenSelectedUser_ResetsTheSelectedUser',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = getTestUser('user');

      // Act
      instance.selectedUser = user;
      instance.deleteUser();

      // Assert
      expect(instance.selectedUser).not.toEqual(user);
    }));

  it('DeleteUser_WhenUserIsDeleted_SuccessMessageIsShown',
    inject([LoginComponent], (instance) => {
      //Arrange
      spyOn(instance.alertingService, 'addSuccess').and.callThrough();

      // Act
      instance.deleteUser();

      // Assert
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Профилот е успешно избришан.');
    }));

  it('DeleteCancelled_WhenDeleteIsCancelled_InfoMessageIsShown',
    inject([LoginComponent], (instance) => {
      //Arrange
      spyOn(instance.alertingService, 'addInfo').and.callThrough();

      // Act
      instance.deleteCancelled();

      // Assert
      expect(instance.alertingService.addInfo).toHaveBeenCalledWith('Бришењето е откажано.');
    }));

  it('SelectUser_GivenAuser_SetsTheSelectedUser',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = getTestUser('user');

      // Act
      instance.selectUser(user);

      // Assert
      expect(instance.selectedUser).toEqual(user);
    }));

  it('ShouldApplySelectedUserLayout_GivenTheSelectedUser_ReturnsTrue',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = getTestUser('user');

      // Act
      instance.selectedUser = user;
      var flag = instance.ShouldApplySelectedUserLayout(user);

      // Assert
      expect(flag).toBeTruthy();
    }));

  it('GetAllUsers_WhenLoginComponentIsInstantiated_AllUsersIsInitialized',
    inject([LoginComponent], (instance) => {

      var localUsers = [{ 'name': 'Daniela', 'profileImg': 'danielImg' }, { 'name': 'Daniela1', 'profileImg': 'danielImg1' }];

      expect(instance.allUsers).toEqual(localUsers);
    }));
});
