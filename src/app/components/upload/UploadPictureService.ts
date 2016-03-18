import {Injectable, bind} from 'angular2/core';
import {Http} from 'angular2/http';

import {GlobalService} from '../../shared/services/GlobalService';
import {AlertingService} from '../alerting/AlertingService';

import {MultipartItem} from '../../shared/plugins/multipart-upload/multipart-item';
import {MultipartUploader} from '../../shared/plugins/multipart-upload/multipart-uploader';

@Injectable()
export class UploadPictureService {
  private uploader: MultipartUploader = new MultipartUploader({ url: this.globalService.URL_UPLOAD_PICTURE });
  private multipartItem: MultipartItem = new MultipartItem(this.uploader);

  constructor(private http: Http,
    private globalService: GlobalService,
    private alertingService: AlertingService) { }

  upload(file: File): void {
    if (this.multipartItem == null) {
      this.multipartItem = new MultipartItem(this.uploader);
    }
    if (this.multipartItem.formData == null)
      this.multipartItem.formData = new FormData();

    this.multipartItem.formData.append('userPhoto', file);
    this.multipartItem.withCredentials = false;
    this.multipartItem.callback = (data) => this.uploadCallback(data);
    this.multipartItem.upload();
  }

  uploadCallback(data): void {
    if (data) {
      this.alertingService.addSuccess('Сликата е успешно додадена!');
    } else {
      this.alertingService.addDanger('Грешка при додавање!');
    }
  }
}

export var uploadPictureServiceInjectables: Array<any> = [
  bind(UploadPictureService).toClass(UploadPictureService)
];
