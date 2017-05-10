import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-edit-preference',
  templateUrl: 'edit-preference.component.html',
  styleUrls: ['edit-preference.component.css']
})
export class EditPreferenceComponent {

  type: string;
  value: string;

  currentPassword: string = '';
  passwordRepeat: string = '';

  constructor(private _dialogRef: MdDialogRef<EditPreferenceComponent>) {
  }

  submit() {
    this._dialogRef.close();
  }
}
