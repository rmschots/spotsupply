import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Language } from './language';

/**
 * This class represents the toolbar component.
 */
@Component({
    moduleId: module.id,
    selector: 'ss-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent implements OnInit {

    @Output() menuOpen = new EventEmitter<boolean>();

    languages: Language[] = [
        new Language('en', 'English'),
        new Language('be-nl', 'Nederlands'),
        new Language('be-fr', 'Français')
    ];
    selectedLanguage: Language = this.languages[0];

    constructor(private translate: TranslateService) {
        translate.setDefaultLang(this.selectedLanguage.code);
        translate.use(this.selectedLanguage.code);
    }

    menuOpened() {
        this.menuOpen.next();
    }

    languageSelected(language: Language) {
        this.selectedLanguage = language;
        this.translate.use(this.selectedLanguage.code);
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

