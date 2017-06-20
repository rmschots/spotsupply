import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ss-order-manager',
  templateUrl: 'order-manager.component.html',
    styleUrls: ['order-manager.component.css']
})
export class OrderManagerComponent {

  constructor() {
    console.log('order manager');
  }
}
