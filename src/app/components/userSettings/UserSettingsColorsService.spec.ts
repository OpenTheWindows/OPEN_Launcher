import {UserSettingsColorsService} from './UserSettingsColorsService';

describe('UserSettingsColorsService', function() {
  var instance: UserSettingsColorsService= null;

  beforeEach(() => {
    instance = new UserSettingsColorsService();
  });
  
  it('UserSettingsColorsService_getPointerColors', function(){
      //Assert
      expect(instance.getPointerColors.length).toEqual(1);
  });
//unit testing

})