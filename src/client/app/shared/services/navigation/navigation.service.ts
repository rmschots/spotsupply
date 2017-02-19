import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NavigationService {

  private title: string = 'home';
  private titleSubject = new Subject<string>();

  getTitle(): string {
    return this.title;
  }

  titleSubscription(obs: ((value: string) => void)) {
    this.titleSubject.subscribe(obs);
  }

  setTitle(title: string) {
    this.title = title;
    this.titleSubject.next(this.title);
  }
}

