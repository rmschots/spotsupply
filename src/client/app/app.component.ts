import { Component, ViewChild } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'ss-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent {

  menuOpen: boolean = false;
  marginLeft: number = 0;

  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor() {
    console.log('Environment config', Config);
    (<any>window).loading_screen.finish();
  }

  menuOpened() {
    this.menuOpen = true;
  }

  sideNavClosed(updateNavbar: boolean) {
    this.menuOpen = false;
    if (updateNavbar) {
      this.navbar.setMenuClosed();
    }
  }
}
