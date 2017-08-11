import { Injectable } from '@angular/core';
import { Language } from '../../components/toolbar/language';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as immutable from 'immutable';

@Injectable()
export class LanguageService {

  static languages: immutable.List<Language> = immutable.List.of(
    new Language('en', 'English'),
    new Language('nl', 'Nederlands'),
    new Language('fr', 'Français')
  );

  language$: BehaviorSubject<Language> = new BehaviorSubject<Language>(LanguageService.languages.get(0));
  private activeLanguage: Language = LanguageService.languages.get(0);

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(LanguageService.languages.get(0).code);
    switch (translate.getBrowserLang()) {
      case 'nl':
        this.setLanguage(LanguageService.languages.get(1));
        break;
      case 'en':
        this.setLanguage(LanguageService.languages.get(0));
        break;
      case 'fr':
        this.setLanguage(LanguageService.languages.get(2));
        break;
      default:
        this.setLanguage(LanguageService.languages.get(0));
        break;
    }
  }

  setLanguage(language: Language) {
    this.activeLanguage = language;
    this.translate.use(this.activeLanguage.code);
    this.language$.next(this.activeLanguage);
  }
}

