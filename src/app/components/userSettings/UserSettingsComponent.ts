import {Component, Input, OnChanges} from 'angular2/core';

import {UserSettingsColorsService} from './UserSettingsColorsService';
import {AlertingService} from '../alerting/AlertingService';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {EnumEx} from '../../shared/enums/EnumEx';
import {UserSettings} from '../../shared/models/UserSettings';
import {ImagesService} from '../../shared/services/ImagesService';

@Component({
  selector: 'settings',
  templateUrl: './app/components/userSettings/userSettings.html'
})
export class UserSettingsComponent implements OnChanges {
  public availablePointerColors: PointerColor[] = new Array<PointerColor>();
  public allImages: string[] = new Array<string>();

  @Input() userSettings: UserSettings;
  ngOnChanges(changes) {
    var changedUserSettings = changes.userSettings.currentValue;
    if (changedUserSettings) {
      this.setBackgroundColorAndPointerColors(this.userSettings.backgroundColor);
      this.selectPointerSize(this.userSettings.pointerSize);
      this.selectPointerColor(this.userSettings.pointerColor);
    }
  }

  constructor(
    private alertingService: AlertingService,
    private pointerColorService: UserSettingsColorsService,
    private imagesService: ImagesService) {

    this.getAvailableImages();
  }

  getAvailableImages() {
    this.imagesService.getPointerImages()
      .subscribe(
      data => this.allImages = data,
      err => this.alertingService.addDanger(err.toString()));
  }

  setBackgroundColorAndPointerColors(backgroundColor: BackgroundColor) {
    this.userSettings.backgroundColor = Number(backgroundColor);
    this.availablePointerColors = this.pointerColorService.getPointerColors(backgroundColor);
  }

  selectBackgroundColor(backgroundColor: BackgroundColor) {
    this.setBackgroundColorAndPointerColors(backgroundColor);
    this.selectPointerColor(PointerColor.White);
  }

  selectPointerColor(pointerColor: PointerColor) {
    this.userSettings.pointerColor = pointerColor;
  }

  selectPointerSize(pointerSize: PointerSize) {
    this.userSettings.pointerSize = pointerSize;
  }

  shouldBeChecked(backgroundColor: BackgroundColor): boolean {
    if (this.userSettings) {
      return this.userSettings.backgroundColor === Number(backgroundColor);
    }
  }

  shouldApplySelectedPointerColorCss(pointerColor: PointerColor): boolean {
    if (this.userSettings) {
      return this.userSettings.pointerColor === pointerColor;
    }
  }

  shouldApplySelectedPointerSizeCss(pointerSize: PointerSize): boolean {
    if (this.userSettings) {
      return this.userSettings.pointerSize === pointerSize;
    }
  }
}
