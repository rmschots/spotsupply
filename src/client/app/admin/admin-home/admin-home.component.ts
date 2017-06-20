import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ss-admin-home',
  templateUrl: 'admin-home.component.html',
  styleUrls: ['admin-home.component.css']
})
export class AdminHomeComponent {

  constructor() {
    console.log('admin home');
  }
}
