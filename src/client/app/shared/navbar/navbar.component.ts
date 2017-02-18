import { Component, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';

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

  logOut() {
    console.log('logging out');
    this.navigated();
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

  notifyMenuClosed() {
    this.menuClose.next();
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

