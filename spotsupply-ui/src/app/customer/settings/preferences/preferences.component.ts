import { Component, HostBinding } from '@angular/core';
import { Unsubscribable } from '../../../shared/components/unsubscribable';
import { LoginModel } from '../../../shared/framework/models/login.model';
import { MdDialog } from '@angular/material';
import { EditPreferenceComponent } from './edit-preference/edit-preference.component';

@Component({
  moduleId: module.id,
  selector: 'ss-preferences',
  templateUrl: 'preferences.component.html',
  styleUrls: ['preferences.component.css']
})
export class PreferencesComponent extends Unsubscribable {

  @HostBinding('id') id = 'preferencespage';

  email = 'email';
  phoneNumber = 'phoneNumber';
  password = 'password';

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
    const dialogRef = this._dialog.open(EditPreferenceComponent);
    const component = dialogRef.componentInstance;
    component.value = this.email;
    component.type = 'email';
    component.submitCallback = (newPass, currPass) => this._loginModel.updateEmail(newPass, currPass);
  }

  openEditPhoneNumberDialog() {
    const dialogRef = this._dialog.open(EditPreferenceComponent);
    const component = dialogRef.componentInstance;
    component.value = this.phoneNumber;
    component.type = 'tel';
    component.submitCallback = (newPass, currPass) => this._loginModel.updatePhoneNumber(newPass, currPass);
  }

  openEditPasswordDialog() {
    const dialogRef = this._dialog.open(EditPreferenceComponent);
    const component = dialogRef.componentInstance;
    component.value = '';
    component.type = 'password';
    component.submitCallback = (newPass, currPass) => this._loginModel.updatePassword(newPass, currPass);
  }
}
