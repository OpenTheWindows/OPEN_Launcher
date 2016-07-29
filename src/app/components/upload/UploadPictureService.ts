import {Injectable, bind} from 'angular2/core';
import {Http} from 'angular2/http';

import {GlobalService} from '../../shared/services/GlobalService';
import {AlertingService} from '../../shared/services/AlertingService';
import {MultipartItem} from '../../shared/plugins/multipart-upload/multipart-item';
import {MultipartUploader} from '../../shared/plugins/multipart-upload/multipart-uploader';

export interface IUploadPictureService {
  upload(file: File): void;
}

@Injectable()
export class UploadPictureService implements IUploadPictureService {
  private uploader: MultipartUploader;
  private multipartItem: MultipartItem;

  constructor(private globalService: GlobalService, private alertingService: AlertingService) {
    this.uploader = new MultipartUploader({ url: this.globalService.URL_UPLOAD_PICTURE });
    this.multipartItem = new MultipartItem(this.uploader);
  }

  upload(file: File): void {
    if (this.multipartItem.formData === undefined) {
      this.multipartItem.formData = new FormData();
    }

    this.multipartItem.formData.append('userPhoto', file);
    this.multipartItem.withCredentials = false;
    this.multipartItem.callback = (data) => this.uploadCallback(data);
    this.multipartItem.upload();
  }

  uploadCallback(result: string): void {
    if (result === 'uploaded') {
      this.alertingService.addSuccess('UPLOAD_PHOTO_SUCCESS_MESSAGE');
    } else {
      this.alertingService.addDanger('UPLOAD_PHOTO_ERROR_MESSAGE');
    }
  }
}

export let uploadPictureServiceInjectables: Array<any> = [
  bind(UploadPictureService).toClass(UploadPictureService)
];
