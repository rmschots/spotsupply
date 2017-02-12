import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

    @Output() menuOpen = new EventEmitter<boolean>();

    languages: string[] = ['eng', 'be-nl', 'be-fr'];
    language: string = this.languages[0];

    menuOpened() {
        this.menuOpen.next();
    }

    languageSelected(selectedLanguage: string) {
        this.language = selectedLanguage;
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

