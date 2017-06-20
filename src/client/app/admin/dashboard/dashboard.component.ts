import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ss-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent {

  constructor() {
    console.log('admin dashboard');
  }
}
