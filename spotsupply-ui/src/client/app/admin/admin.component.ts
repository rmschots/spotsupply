import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-admin',
  templateUrl: 'app/admin/admin.component.html',
  styleUrls: ['app/admin/admin.component.css']
})
export class AdminComponent {

  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('admin');
  }
}
