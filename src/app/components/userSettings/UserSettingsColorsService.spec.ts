import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';


describe('UserSettingsColorsService', function() {
  var instance: UserSettingsColorsService= null;

  beforeEach(() => {
    instance = new UserSettingsColorsService();
  });

  it('UserSettingsColorsService_getPointerColors_ForBlackWhiteColor', function(){
      //Assert
      var pointerColors = instance.getPointerColors(BackgroundColor.BlackAndWhite);
      
      expect(pointerColors.length).toEqual(2);
  });
  
   it('UserSettingsColorsService_getPointerColors_ForInColor', function(){
      //Assert
      var inColorAvailablePointerColor = instance.getPointerColors(BackgroundColor.InColor);
      
      expect(inColorAvailablePointerColor.length).toEqual(5);
  });
  
})