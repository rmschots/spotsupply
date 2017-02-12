import { Component, ViewChild, ElementRef } from '@angular/core';
import { Config } from './shared/index';
import './operators';

@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {

    menuOpen: boolean = false;
    marginLeft: number = 0;

    @ViewChild('navParent') private navParentElement: ElementRef;

    constructor() {
        console.log('Environment config', Config);
    }

    menuOpened() {
        this.marginLeft = 0;
        this.menuOpen = true;
    }

    sideNavClosed() {
        this.menuOpen = false;
        this.marginLeft = 0;
    }

    menuSwiped(event: any) {
        if (event.direction === 2) {
            this.menuOpen = false;
        }
    }

    navigated() {
        this.menuOpen = false;
    }

    menuSlide(event: any) {
        if (event.isFinal) {
            if (this.menuOpen) {
                if (this.navParentElement.nativeElement.clientWidth / 2 > Math.abs(this.marginLeft)) {
                    this.marginLeft = 0;
                } else {
                    this.menuOpen = false;
                }
            }
        } else {
            if (event.deltaX > 0) {
                this.marginLeft = 0;
            } else {
                if (this.navParentElement.nativeElement.clientWidth / 2 < Math.abs(this.marginLeft)) {
                    this.menuOpen = false;
                }
                this.marginLeft = event.deltaX;
            }
        }
    }
}
