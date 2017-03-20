import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-location-loading',
  templateUrl: 'location-loading.component.html',
  styleUrls: ['location-location.component.css']
})
export class LocationLoadingComponent {

  constructor(private dialogRef: MdDialogRef<LocationLoadingComponent>) {
  }
}
