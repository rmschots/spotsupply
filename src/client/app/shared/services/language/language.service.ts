import { Injectable } from '@angular/core';
import { Language } from '../../components/toolbar/language';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { List } from 'immutable';

@Injectable()
export class LanguageService {

  static languages: List<Language> = List.of(
    new Language('en', 'English'),
    new Language('be-nl', 'Nederlands'),
    new Language('be-fr', 'Français')
  );

  language$: BehaviorSubject<Language> = new BehaviorSubject<Language>(LanguageService.languages.get(0));
  private activeLanguage: Language = LanguageService.languages.get(0);

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.activeLanguage.code);
    translate.use(this.activeLanguage.code);
  }

  setLanguage(language: Language) {
    this.activeLanguage = language;
    this.translate.use(this.activeLanguage.code);
    this.language$.next(this.activeLanguage);
  }
}

