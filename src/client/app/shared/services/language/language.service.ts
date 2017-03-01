import { Injectable } from '@angular/core';
import { Language } from '../../components/toolbar/language';
import { TranslateService } from 'ng2-translate';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LanguageService {

  private languages: Language[] = [
    new Language('en', 'English'),
    new Language('be-nl', 'Nederlands'),
    new Language('be-fr', 'Français')
  ];
  private activeLanguage: Language = this.languages[0];
  private languageSubject: Subject<Language> = new Subject<Language>();

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.activeLanguage.code);
    translate.use(this.activeLanguage.code);
  }

  languageSubscription(obs: ((value: Language) => void)) {
    this.languageSubject.subscribe(obs);
  }

  getLanguages(): Language[] {
    return this.languages;
  }

  getActiveLanguage() {
    return this.activeLanguage;
  }

  setLanguage(language: Language) {
    this.activeLanguage = language;
    this.translate.use(this.activeLanguage.code);
    this.languageSubject.next(this.activeLanguage);
  }
}

