import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent {
  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('contact');
  }
}
