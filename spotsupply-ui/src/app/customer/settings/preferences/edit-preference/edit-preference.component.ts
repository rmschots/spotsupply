import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'ss-edit-preference',
  templateUrl: 'edit-preference.component.html',
  styleUrls: ['edit-preference.component.css']
})
export class EditPreferenceComponent {

  type: string;
  value: string;

  currentPassword = '';
  passwordRepeat = '';

  errorMessage: string;

  submitCallback: (value: string, currentPassword: string) => Observable<boolean>;

  constructor(private _dialogRef: MdDialogRef<EditPreferenceComponent>) {
  }

  submit() {
    this.submitCallback(this.value, this.currentPassword)
      .take(1)
      .subscribe(() => {
          this._dialogRef.close();
        },
        error => {
          this.errorMessage = error.message;
        });
  }
}
