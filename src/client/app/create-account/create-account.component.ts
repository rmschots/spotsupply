import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';

@Component({
  moduleId: module.id,
  selector: 'ss-create-account',
  templateUrl: 'create-account.component.html',
  styleUrls: ['create-account.component.css']
})
export class CreateAccountComponent {

  created: boolean = false;

  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('createAccount');
  }

  createAccount() {
    this.created = true;
  }
}
