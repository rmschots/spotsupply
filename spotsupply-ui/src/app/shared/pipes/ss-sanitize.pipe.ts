import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssSanitize'
})
export class SSSanitizePipe implements PipeTransform {

  transform(text: string): string {
    const ret = text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    console.log(ret);
    return ret;
  }
}
