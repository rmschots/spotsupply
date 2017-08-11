import { Component } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent {

  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('settings');
  }
}
