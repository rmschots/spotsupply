import { Component } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  moduleId: module.id,
  selector: 'ss-order-manager',
  templateUrl: 'order-manager.component.html',
  styleUrls: ['order-manager.component.css']
})
export class OrderManagerComponent {

}

