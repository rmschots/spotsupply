import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ss-user-manager',
  templateUrl: 'user-manager.component.html',
    styleUrls: ['user-manager.component.css']
})
export class UserManagerComponent {

  constructor() {
    console.log('user manager');
  }
}
