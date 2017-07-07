import { Pipe, PipeTransform } from '@angular/core';
import { Translations } from '../objects/common/translations';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import 'rxjs/observable/interval';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'ssActive'
})
export class SSActivePipe implements PipeTransform {

  transform(items: any[]): any {
    return items.filter(item => item.active);
  }
}
