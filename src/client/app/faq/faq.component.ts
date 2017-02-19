import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-faq',
  templateUrl: 'faq.component.html',
  styleUrls: ['faq.component.css']
})
export class FAQComponent {
  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('faq');
  }
}
