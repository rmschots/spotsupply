import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-location-loading',
  templateUrl: 'app/shared/components/location-loading/location-loading.component.html',
  styleUrls: ['app/shared/components/location-loading/location-location.component.css']
})
export class LocationLoadingComponent {

  constructor(private dialogRef: MdDialogRef<LocationLoadingComponent>) {
  }
}
