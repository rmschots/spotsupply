import { Component } from '@angular/core';
import { LanguageService } from '../../shared/services/language/language.service';
import { Language } from '../../shared/components/toolbar/language';

@Component({
  moduleId: module.id,
  selector: 'ss-preferences',
  templateUrl: 'preferences.component.html',
  styleUrls: ['preferences.component.css']
})
export class PreferencesComponent {
  languages: Language[];
  selectedLanguage: Language;

  constructor(private languageService: LanguageService) {
    this.languages = languageService.getLanguages();
    this.selectedLanguage = languageService.getActiveLanguage();
    languageService.languageSubscription(language => {
      this.selectedLanguage = language;
    });
  }

  languageSelected(language: Language) {
    this.languageService.setLanguage(language);
  }
}
