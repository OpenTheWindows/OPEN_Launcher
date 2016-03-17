import {Component} from 'angular2/core';

import {AlertingService} from './AlertingService';

import {Alert} from './Alert'

@Component({
    selector: 'alerts',    
    template: `
        <div *ngIf="hasAlerts()">
            <div *ngFor="#alert of alerts()" class="alert alert-{{alert.type}}">
                <label id="messagelabel">{{ alert.message }}</label>
                <div class="close" (click)="removeAlert(alert)">
                    <span class="glyphicon glyphicon-remove"></span>
                </div>
            </div>
        </div>`
})
export class AlertingComponent {
    constructor(private alertingService: AlertingService) {}

    alerts(): Alert[] {
        return this.alertingService.currentAlerts;
    }

    hasAlerts(): boolean {
        return this.alertingService.currentAlerts.length > 0;
    }

    removeAlert(alert: Alert) {
        this.alertingService.removeAlert(alert);
    }
}