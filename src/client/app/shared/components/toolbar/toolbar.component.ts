import { Component, Output, EventEmitter } from '@angular/core';
import { Language } from './language';
import { NavigationService } from '../../services/navigation/navigation.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  moduleId: module.id,
  selector: 'ss-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent {

  @Output() menuOpen = new EventEmitter<boolean>();

  title: string;
  languages: Language[];
  selectedLanguage: Language;

  constructor(private navigationService: NavigationService,
              private languageService: LanguageService) {
    this.title = this.navigationService.getTitle();
    this.languages = languageService.getLanguages();
    this.selectedLanguage = languageService.getActiveLanguage();

    this.navigationService.titleSubscription((title: string) => {
      this.title = title;
    });
    languageService.languageSubscription(language => {
      this.selectedLanguage = language;
    });
  }

  menuOpened() {
    this.menuOpen.next();
  }

  languageSelected(language: Language) {
    this.languageService.setLanguage(language);
  }
}

