import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {UserSettingsService} from './UserSettingsService';
import {GlobalService} from './GlobalService';
import * as UserSettingsEnums from '../enums/UserSettingsEnums';
import {UserSettings} from '../models/UserSettings';

describe('UserSettingsService', () => {

  function getDefaultUserSettingsObject() {
    return getUserSettingsObject(
      UserSettingsEnums.PointerSize.Small,
      UserSettingsEnums.PointerType.Hand,
      UserSettingsEnums.PointerColor.White,
      UserSettingsEnums.BackgroundColor.InColor
    );
  }
  function getUserSettingsObject(
    pointerSize: UserSettingsEnums.PointerSize,
    pointerType: UserSettingsEnums.PointerType,
    pointerColor: UserSettingsEnums.PointerColor,
    backgroundColor: UserSettingsEnums.BackgroundColor
  ): UserSettings {
    var result = new UserSettings();
    result.pointerSize = pointerSize;
    result.pointerType = pointerType;
    result.pointerColor = pointerColor;
    result.backgroundColor = backgroundColor;
    return result;
  }

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    GlobalService,
    UserSettingsService,
  ]);

  it('should have http', inject([UserSettingsService], (userSettingsService) => {
    expect(!!userSettingsService.http).toEqual(true);
  }));

  it('getUserSettingsFor_ValidUserName_ValidateRetrievedDataMatchFromTheHttpResponse',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      var userSettingsObject = getDefaultUserSettingsObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            }
            )));
        });

      userSettingsService.getUserSettingsFor('username').subscribe(
        (data) => {
          expect(data.pointerSize).toBe(UserSettingsEnums.PointerSize.Small);
          expect(data.pointerType).toBe(UserSettingsEnums.PointerType.Hand);
          expect(data.pointerColor).toBe(UserSettingsEnums.PointerColor.White);
          expect(data.backgroundColor).toBe(UserSettingsEnums.BackgroundColor.InColor);
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('saveUserSettingsForUser_ValidUserNameAndValidUserSettings_ValidateRetrievedDataMatchFromTheHttpResponse',
    inject([UserSettingsService, MockBackend], (userSettingsService: UserSettingsService, mockBackend) => {
      var userSettingsObject = getDefaultUserSettingsObject();

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(userSettingsObject)
            }
            )));
        });

      userSettingsService.saveUserSettingsForUser('username', userSettingsObject).subscribe(
        (data) => {
          expect(data.pointerSize).toBe(UserSettingsEnums.PointerSize.Small);
          expect(data.pointerType).toBe(UserSettingsEnums.PointerType.Hand);
          expect(data.pointerColor).toBe(UserSettingsEnums.PointerColor.White);
          expect(data.backgroundColor).toBe(UserSettingsEnums.BackgroundColor.InColor);
        },
        (error) => {
          fail(error);
        }
      );
    }));
});
