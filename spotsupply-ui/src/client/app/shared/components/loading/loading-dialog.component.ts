import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-loading-dialog',
  templateUrl: 'app/shared/components/loading/loading-dialog.component.html',
  styleUrls: ['app/shared/components/loading/loading-dialog.component.css']
})
export class LoadingDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public data: string,
              private dialogRef: MdDialogRef<LoadingDialogComponent>) {
  }
}
