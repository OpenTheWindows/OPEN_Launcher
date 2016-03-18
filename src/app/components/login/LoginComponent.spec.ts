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

import {provide, Injector, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {RouterLink, Router} from 'angular2/router';

import {User, Users} from '../../shared/models/User';
import {AuthService} from '../../shared/services/AuthService';
import {UserService} from '../../shared/services/UserService';
import {AlertingService} from '../alerting/AlertingService';
import {LoginComponent} from './LoginComponent';
import {Alert} from '../Alerting/Alert';

describe('LoginComponent', function() {
    class UserServiceMock {
        deleteUser(name) {
            var user1 = new User();
            user1.name = 'user1';
            var user2 = new User();
            user2.name = 'user2';
            var user3 = new User();
            user3.name = 'user3';
            var allUsers: User[] = new Array<User>();
            allUsers[0] = user1;
            allUsers[1] = user2;
            allUsers[2] = user3;

            for (var index = 0; index < 3; index++) {
                if (allUsers[index].name === name) {
                    allUsers.splice(index, 1);
                    break;
                }
            }

            return Observable.of(allUsers);
        }

        getAllUsers() {
            var string1 = '[{"name": "Daniela", "profileImg":"danielImg"},{"name": "Daniela1", "profileImg":"danielImg1"}]';
            var obj = JSON.parse(string1);
            return Observable.of(obj);
        }
        addUser() { }
    }

    class AlertingServiceMock {
        addDanger(message: string) { }
        addSuccess(message: string) { }
        addInfo(message: string) { }
        addAlert() { }
    }

    class AuthServiceMock {
        currentUsers: Array<User> = new Array<User>();
        getUser() {
            var string1 = '[{"name": "Daniela", "profileImg":"danielImg"},{"name": "Daniela1", "profileImg":"danielImg1"}]';
            var obj = JSON.parse(string1);
            return Observable.of(obj);
        }
        login() { }
        CheckAuth() { }
    }
    class RouterMock {
        navigate(urlList: Array<String>) { }
    }

    var injector: Injector;
    var instance: LoginComponent = null;
    var _authService: AuthService;
    var _userService: UserService;
    var _alertingService: AlertingService;
    var _router: Router;
    var user: User;
    var user2: User;
    var user3: User;
    var selectedUser: User;
    var allUsers: User[];


    beforeEach(() => {
        injector = Injector.resolveAndCreate([
            provide(AuthService, { useClass: AuthServiceMock }),
            provide(UserService, { useClass: UserServiceMock }),
            provide(AlertingService, { useClass: AlertingServiceMock }),
            provide(Router, { useClass: RouterMock }),
        ]);

        _authService = injector.get(AuthService);
        _userService = injector.get(UserService);
        _alertingService = injector.get(AlertingService);
        _router = injector.get(Router);

        instance = new LoginComponent(_alertingService, _userService, _authService, _router);

        user = new User();
        user.name = 'user';

        selectedUser = new User();
        selectedUser.name = "user1";

        allUsers = new Array<User>();
        user2 = new User();
        user2.name = 'user2';
        user3 = new User();
        user3.name = 'user3';
        allUsers[0] = user2;
        allUsers[1] = user3;

    });

    it('Login_GivenInavlidUser_UnsuccessfulLogin', function() {
        //Act
        spyOn(_alertingService, 'addDanger').and.callThrough();
        spyOn(_authService, 'login').and.callFake(function() { return false; });
        instance.selectUser(user);
        instance.login();

        //Assert
        expect(_authService.login).toHaveBeenCalledWith(user.name);
        expect(_alertingService.addDanger).toHaveBeenCalledWith('Корисникот не е валиден.');
    });
    
    it('Login_GivenValidUser_SuccessfulLogin', function() {
        //Act
        spyOn(_router, 'navigate').and.callThrough();
        spyOn(_authService, 'login').and.callFake(function() { return true; });
        instance.selectUser(user);
        instance.login();

        //Assert
        expect(_authService.login).toHaveBeenCalledWith(user.name);
        expect(_router.navigate).toHaveBeenCalledWith(['/Home']);
    });

    it('DeleteUser_GivenSelectedUser_DeletesTheSelectedUser', function() {
        // Arrange
        instance.selectedUser = selectedUser;

        // Act
        instance.deleteUser();

        // Assert
        expect(instance.allUsers).toEqual(allUsers);
    });

    it('DeleteUser_GivenSelectedUser_ResetsTheSelectedUser', function() {
        // Arrange       
        instance.selectedUser = selectedUser;

        // Act
        instance.deleteUser();

        // Assert
        expect(instance.selectedUser).not.toEqual(selectedUser);
    });

    it('DeleteUser_WhenUserIsDeleted_SuccessMessageIsShown', function() {
        // Act
        spyOn(_alertingService, 'addSuccess');
        instance.deleteUser();

        // Assert
        expect(_alertingService.addSuccess).toHaveBeenCalledWith('Профилот е успешно избришан.');
    });

    it('DeleteCancelled_WhenDeleteIsCancelled_InfoMessageIsShown', function() {
        // Act
        spyOn(_alertingService, 'addInfo');
        instance.deleteCancelled();

        // Assert
        expect(_alertingService.addInfo).toHaveBeenCalledWith('Бришењето е откажано.');
    });

    it('SelectUser_GivenAuser_SetsTheSelectedUser', function() {
        // Act
        instance.selectUser(selectedUser);

        // Assert
        expect(instance.selectedUser).toEqual(selectedUser);
    });

    it('ShouldApplySelectedUserCss_GivenTheSelectedUser_ReturnsTrue', function() {
        // Act
        instance.selectedUser = selectedUser;
        var flag = instance.ShouldApplySelectedUserCss(selectedUser);

        // Assert
        expect(flag).toBeTruthy();
    });

    it('GetAllUsers_WhenLoginComponentIsInstantiated_AllUsersIsInitialized', function() {
       
        var localUsers = [{ 'name': 'Daniela', 'profileImg': 'danielImg' }, { 'name': 'Daniela1', 'profileImg': 'danielImg1' }];

        expect(instance.allUsers).toEqual(localUsers);
    });
});
