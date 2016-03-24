import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing';

import {provide, Injector, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {UserSettingsComponent} from './UserSettingsComponent';
import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {Alert} from '../alerting/Alert';
import {AlertingService} from '../alerting/AlertingService';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserSettings} from '../../shared/models/UserSettings';

describe('UserSettingsComponent', function() {
  class AlertingServiceMock {
    currentAlerts: Array<Alert> = new Array<Alert>();

    addAlert(type: string, message: string) {
      var alert = new Alert(type, message);
      this.currentAlerts.push(alert);
    }

    removeAlert(alert: Alert) {
      for (var index = 0; index < this.currentAlerts.length; index++) {
        if (this.currentAlerts[index] === alert) {
          this.currentAlerts.splice(index, 1);
          break;
        }
      }
    }
  }

  class ImagesServiceMock {
    getPointerImages() {
      var pointerImages = '["./app/assets/images/pointer/small.png", "./app/assets/images/pointer/big.png"]';
      var obj = JSON.parse(pointerImages);
      return Observable.of(obj);
    }
  }

  class UserSettingsColorsServiceMock {
    getPointerColors(backgroundColor: BackgroundColor): PointerColor[] {
      return getTestPointerColors();
    }
  }

  function getTestPointerColors(): PointerColor[] {
    return [
      PointerColor.White,
      PointerColor.Yellow
    ];
  }

  var injector: Injector;
  var instance: UserSettingsComponent = null;
  var _alertingService: AlertingService;
  var _pointerColorService: UserSettingsColorsService;
  var _imagesService: ImagesService;

  beforeEach(() => {
    injector = Injector.resolveAndCreate([
      provide(AlertingService, { useClass: AlertingServiceMock }),
      provide(UserSettingsColorsService, { useClass: UserSettingsColorsService }),
      provide(ImagesService, { useClass: ImagesServiceMock })
    ]);

    _alertingService = injector.get(AlertingService);
    _pointerColorService = injector.get(UserSettingsColorsService);
    _imagesService = injector.get(ImagesService);

    instance = new UserSettingsComponent(_alertingService, _pointerColorService, _imagesService);
  });

  it('UserSettingsComponent_getAvailableImages_shouldSetAllPointerImages', () => {
    // Arrange
    var allPointerImagesLocal: string[] = new Array<string>();
    allPointerImagesLocal = ['./app/assets/images/pointer/small.png', './app/assets/images/pointer/big.png'];

    // Act
    instance.getAvailableImages();

    // Assert
    expect(instance.allImages).toEqual(allPointerImagesLocal);
  });

  // it('UserSettingsComponent_selectBackgroundColor_shouldSetChoosenBackgroundAndDefaultPointerOptions', () => {
  //   // Arrange
  //   var bgColor: BackgroundColor = BackgroundColor.BlackAndWhite;
  //   var defaultPointerColor: PointerColor = PointerColor.White;
  //   instance.ngOnInit();

  //   // Act
  //   instance.selectBackgroundColor(bgColor);

  //   spyOn(_pointerColorService, 'getPointerColors').and.callThrough();

  //   // Assert
  //   expect(instance.userSettings.backgroundColor).toEqual(bgColor);
  //   expect(instance.userSettings.pointerColor).toEqual(defaultPointerColor);
  //   // expect(instance.availablePointerColors).toEqual(getTestPointerColors());
  // });

  // beforeEachProviders(() => [
  //   provide(AlertingService, { useClass: AlertingServiceMock }),
  //   provide(UserSettingsColorsService, { useClass: UserSettingsColorsService }),
  //   provide(ImagesService, { useClass: ImagesServiceMock })
  // ]);

  // it('test component builder', injectAsync([TestComponentBuilder], (tcb) => {
  //   return tcb.overrideTemplate(UserSettingsComponent, '<div></div>').createAsync(UserSettingsComponent).then((fixture) => {
  //     fixture.componentInstance.userSettings = new UserSettings();
  //     fixture.componentInstance.userSettings.backgroundColor = BackgroundColor.InColor;
  //     fixture.componentInstance.userSettings.pointerColor = PointerColor.Blue;
  //     fixture.detectChanges();

  //     var bgColor: BackgroundColor = BackgroundColor.BlackAndWhite;
  //     var defaultPointerColor: PointerColor = PointerColor.White;

  //     // Act
  //     instance.selectBackgroundColor(bgColor);

  //     spyOn(_pointerColorService, 'getPointerColors').and.callThrough();

  //     // Assert
  //     expect(instance.userSettings.backgroundColor).toEqual(bgColor);
  //     expect(instance.userSettings.pointerColor).toEqual(defaultPointerColor);
  //     // expect(instance.availablePointerColors).toEqual(getTestPointerColors());
  //   });
  // }));
});
