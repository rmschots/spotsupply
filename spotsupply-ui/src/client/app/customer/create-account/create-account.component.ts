import { Component } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { LoginModel } from '../../shared/framework/models/login.model';
import { CreateUser } from '../../shared/objects/account/create-user';
import { MdSnackBar } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-create-account',
  templateUrl: 'app/customer/create-account/create-account.component.html',
  styleUrls: ['app/customer/create-account/create-account.component.css']
})
export class CreateAccountComponent {

  created: boolean = false;
  createUser: CreateUser = new CreateUser('', '', '');
  passwordConfirmation: string = '';

  constructor(private navigationService: NavigationService,
              private loginModel: LoginModel,
              private _snackBar: MdSnackBar) {
    navigationService.setTitle('createAccount');
  }

  onSubmit() {
    this.loginModel.createUser(this.createUser)
      .take(1)
      .subscribe(() => {
          this.created = true;
        },
        (error) => {
          let errorMessage: string;
          if (error.errors && error.errors.length > 0) {
            errorMessage = error.errors[0].defaultMessage;
          } else {
            errorMessage = error.message;
          }
          this._snackBar.open(errorMessage, null, {
            duration: 2000
          });
        });
  }
}
