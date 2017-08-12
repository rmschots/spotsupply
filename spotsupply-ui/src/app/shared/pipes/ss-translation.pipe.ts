import { Pipe, PipeTransform } from '@angular/core';
import { Translations } from '../objects/common/translations';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'ssTranslate'
})
export class SSTranslatePipe implements PipeTransform {

  private static translate(translatable: Translations, language: string): string {
    if (!translatable) {
      return '';
    }
    switch (language) {
      case 'en':
      case 'nl':
      case 'fr':
        return translatable[language];
      default:
        return translatable.en;
    }
  }

  constructor(private _translateService: TranslateService) {
  }

  transform(translatable: Translations): Observable<string> {
    return this._translateService.onLangChange
      .map((event: LangChangeEvent) => {
        return SSTranslatePipe.translate(translatable, event.lang);
      })
      .startWith(SSTranslatePipe.translate(translatable, this._translateService.currentLang));
  }
}
