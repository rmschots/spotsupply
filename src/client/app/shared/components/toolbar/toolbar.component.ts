import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Language } from './language';
import { NavigationService } from '../../services/navigation/navigation.service';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'ss-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {

  @Output() menuOpen = new EventEmitter<boolean>();

  title: string;

  languages: Language[] = [
    new Language('en', 'English'),
    new Language('be-nl', 'Nederlands'),
    new Language('be-fr', 'Français')
  ];
  selectedLanguage: Language = this.languages[0];

  constructor(private translate: TranslateService, private navigationService: NavigationService) {
    translate.setDefaultLang(this.selectedLanguage.code);
    translate.use(this.selectedLanguage.code);
    this.title = this.navigationService.getTitle();
    this.navigationService.titleSubscription((title: string) => {
      this.title = title;
    });
  }

  menuOpened() {
    this.menuOpen.next();
  }

  languageSelected(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(this.selectedLanguage.code);
  }
}

