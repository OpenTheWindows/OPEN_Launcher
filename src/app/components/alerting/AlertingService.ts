import {Injectable, bind} from 'angular2/core';

import {Alert} from './Alert';

@Injectable()
export class AlertingService {
  public currentAlerts: Array<Alert> = new Array<Alert>();

  constructor() { }

  addAlert(type: string, message: string): void {
    var alert = new Alert(type, message);
    this.currentAlerts.push(alert);
    setTimeout(() => this.removeAlert(alert), 3500);
  };

  addSuccess(message: string): void {
    this.addAlert('success', message);
  }

  addInfo(message: string): void {
    this.addAlert('info', message);
  }

  addWarning(message: string): void {
    this.addAlert('warning', message);
  }

  addDanger(message: string): void {
    this.addAlert('danger', message);
  }

  removeAlert(alert: Alert): void {
    for (var index = 0; index < this.currentAlerts.length; index++) {
      if (this.currentAlerts[index] === alert) {
        this.currentAlerts.splice(index, 1);
        break;
      }
    }
  }
}

export var alertingServiceInjectables: Array<any> = [
  bind(AlertingService).toClass(AlertingService)
];
