import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginModel } from './shared/framework/models/login.model';

@Component({
  moduleId: module.id,
  selector: 'ss-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent implements OnInit {

  isDesktop: boolean = false;
  menuOpen: boolean = false;
  marginLeft: number = 0;

  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private _loginModel: LoginModel) {
    console.log('Environment config', Config);
    (<any>window).loading_screen.finish();
  }

  menuOpened() {
    this.menuOpen = true;
  }

  sideNavClosed(updateNavbar: boolean) {
    if (updateNavbar) {
      this.navbar.setMenuClosed();
    }
    this.menuOpen = false;
  }

  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i
        .test(navigator.userAgent)) {
      console.log('mobile');
    } else {
      console.log('desktop');
      this.isDesktop = true;
    }
    this._loginModel.loadAccount().subscribe(loggedIn => {
      console.log('logged in: ' + loggedIn);
    },
    error => {
      console.log(error);
    });
  }

}
