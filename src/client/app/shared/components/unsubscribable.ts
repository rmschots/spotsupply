import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export abstract class Unsubscribable implements OnDestroy {

  protected _ngUnsubscribe$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this._ngUnsubscribe$.next();
    this._ngUnsubscribe$.complete();
  }
}
