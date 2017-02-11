import { Component, OnInit } from '@angular/core';

/**
 * This class represents the toolbar component.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

    menuIsVisible: boolean = false;

    menuToggled() {
        this.menuIsVisible = !this.menuIsVisible;
    }

    ngOnInit(): void {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i
                .test(navigator.userAgent)) {
            console.log('mobile');
        } else {
            console.log('non-mobile');
        }
    }
}

