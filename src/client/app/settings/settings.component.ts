import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { MdTabNavBar } from '@angular/material';
import { UserService } from '../shared/services/user/user.service';

@Component({
  moduleId: module.id,
  selector: 'ss-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
  isLoggedIn = false;
  @ViewChild(MdTabNavBar) private tabs: MdTabNavBar;

  constructor(private navigationService: NavigationService, private userService: UserService) {
    navigationService.setTitle('settings');
    this.isLoggedIn = userService.isLoggedIn();
    userService.loginSubscription((userDetails) => {
      this.isLoggedIn = !!userDetails;
      this.updateTabs();
    });
  }

  ngAfterViewInit(): void {
    this.updateTabs();
  }

  private updateTabs() {
    // mdInkBar has a nasty bug which makes it misaligned on load
    // https://github.com/angular/material2/issues/3133
    setTimeout(() => {
      this.tabs._activeLinkChanged = true;
      this.tabs.ngAfterContentChecked();
    }, 1);
  }
}
