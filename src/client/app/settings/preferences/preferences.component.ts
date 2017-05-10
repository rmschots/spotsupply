import { Component } from '@angular/core';
import { Unsubscribable } from '../../shared/components/unsubscribable';
import { LoginModel } from '../../shared/framework/models/login.model';
import { MdDialog } from '@angular/material';
import { EditPreferenceComponent } from './edit-preference/edit-preference.component';

@Component({
  moduleId: module.id,
  selector: 'ss-preferences',
  templateUrl: 'preferences.component.html',
  styleUrls: ['preferences.component.css']
})
export class PreferencesComponent extends Unsubscribable {

  email: string = 'email';
  phoneNumber: string = 'phoneNumber';
  password: string = 'password';

  constructor(private _loginModel: LoginModel, private _dialog: MdDialog) {
    super();
    _loginModel.loginUser$.takeUntil(this._ngUnsubscribe$)
      .subscribe(userLogin => {
        if (!!userLogin) {
          this.email = userLogin.email;
          this.phoneNumber = userLogin.phoneNumber;
        }
      });
  }

  openEditEmailDialog() {
    let dialogRef = this._dialog.open(EditPreferenceComponent);
    let component = dialogRef.componentInstance;
    component.value = this.email;
    component.type = 'email';
  }

  openEditPhoneNumberDialog() {
    let dialogRef = this._dialog.open(EditPreferenceComponent);
    let component = dialogRef.componentInstance;
    component.value = this.phoneNumber;
    component.type = 'tel';
  }

  openEditPasswordDialog() {
    let dialogRef = this._dialog.open(EditPreferenceComponent);
    let component = dialogRef.componentInstance;
    component.value = '';
    component.type = 'password';
  }
}
