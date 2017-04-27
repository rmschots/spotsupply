import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { LoginModel } from '../shared/framework/models/login.model';
import { CreateUser } from '../shared/objects/account/create-user';

@Component({
  moduleId: module.id,
  selector: 'ss-create-account',
  templateUrl: 'create-account.component.html',
  styleUrls: ['create-account.component.css']
})
export class CreateAccountComponent {

  created: boolean = false;

  constructor(private navigationService: NavigationService,
              private loginModel: LoginModel) {
    navigationService.setTitle('createAccount');
  }

  createAccount() {
    this.loginModel.createUser(new CreateUser('email', 'phoneNumber', 'password'))
      .take(1)
      .subscribe(() => {
        this.created = true;
      });
  }
}
