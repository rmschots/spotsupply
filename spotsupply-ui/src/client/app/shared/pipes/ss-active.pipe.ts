import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssActive'
})
export class SSActivePipe implements PipeTransform {

  transform(items: any[]): any {
    return items.filter(item => item.active);
  }
}
