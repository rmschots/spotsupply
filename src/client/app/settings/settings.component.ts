import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { MdTabNavBar } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild(MdTabNavBar) private tabs: MdTabNavBar;

  constructor(private navigationService: NavigationService) {
    navigationService.setTitle('settings');
  }

  ngAfterViewInit(): void {
    // mdInkBar has a nasty bug which makes it misaligned on load
    // https://github.com/angular/material2/issues/3133
    setTimeout(() => {
      this.tabs._activeLinkChanged = true;
      this.tabs.ngAfterContentChecked();
    }, 1);
  }
}
