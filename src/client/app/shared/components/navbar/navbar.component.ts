import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MdDialog } from '@angular/material';
import { LoginModel } from '../../framework/models/login.model';
import { DataStatus } from '../../services/gateway/data-status';

@Component({
  moduleId: module.id,
  selector: 'ss-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})

export class NavbarComponent {

  @Output() menuClose = new EventEmitter<boolean>();
  @Output() margin = new EventEmitter<number>();
  @Input() menuOpen: boolean;
  marginLeft: number;
  @ViewChild('navRoot') navParentElement: ElementRef;

  constructor(private _loginModel: LoginModel, public dialog: MdDialog) {
  }

  logIn() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === 'SUCCESS') {
        this.navigated();
      }
    });
  }

  logOut() {
    this._loginModel.logout();
    this.navigated();
  }

  get isLoggedIn() {
    return this._loginModel.loginAvailable$.map(dataStatus => {
      return dataStatus === DataStatus.AVAILABLE;
    });
  }

  menuSwiped(event: any) {
    if (event.direction === 2) {
      this.closeMenu();
    }
  }

  navigated() {
    this.closeMenu();
  }

  menuSlide(event: any) {
    if (event.isFinal) {
      if (this.menuOpen) {
        if (this.navParentElement.nativeElement.clientWidth / 2 > Math.abs(this.marginLeft)) {
          this.setMarginLeft(0);
        } else {
          this.closeMenu();
        }
      }
    } else {
      if (this.menuOpen) {
        if (event.deltaX > 0) {
          this.setMarginLeft(0);
        } else {
          this.setMarginLeft(event.deltaX);
        }
      } else {
        event.preventDefault();
      }
    }
  }

  setMenuClosed() {
    this.menuOpen = false;
    this.setMarginLeft(0);
  }

  private setMarginLeft(margin: number) {
    this.marginLeft = margin;
    this.margin.next(this.marginLeft);
  }

  private closeMenu() {
    this.menuOpen = false;
    this.menuClose.next();
  }
}

