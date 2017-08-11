import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MdPaginator, MdSort } from '@angular/material';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { URLSearchParams } from '@angular/http';
import { OrdersSearchResult } from '../../shared/objects/search/orders-search-result';
import { Order } from '../../shared/objects/order/order';
import { BeachModel } from '../../shared/framework/models/beach.model';
import { DataSource } from '@angular/cdk';

@Component({
  moduleId: module.id,
  selector: 'ss-order-manager',
  templateUrl: 'order-manager.component.html',
  styleUrls: ['order-manager.component.css']
})
export class OrderManagerComponent implements OnInit {

  displayedColumns = ['id', 'beachId', 'phoneNumber', 'status', 'price', 'orderDateTime', 'requestedTime', 'deliveredDateTime', 'items'];

  exampleDatabase = new ExampleDatabase(this._restGateway);
  dataSource: ExampleDataSource | null;
  @ViewChild('filter') filter: ElementRef;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private _restGateway: RestGatewayService, private _beachModel: BeachModel) {
  }

  getbeachName(beachId: number) {
    return this._beachModel.getBeachObs(beachId)
      .filter(beach => !!beach)
      .map(beach => beach.name);
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.sort, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  searchResult$: BehaviorSubject<OrdersSearchResult> = new BehaviorSubject<OrdersSearchResult>(null);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  error$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private _restGateway: RestGatewayService) {
  }

  get data$(): Observable<Array<Order>> {
    return this.searchResult$.map(data => data ? data.orders : []);
  }

  get page$(): Observable<number> {
    return this.searchResult$.map(data => data ? data.page : 0);
  }

  get totalResults$(): Observable<number> {
    return this.searchResult$.map(data => data ? data.totalResults : 0);
  }

  get pageSize$(): Observable<number> {
    return this.searchResult$.map(data => data ? data.pageSize : 10);
  }

  doSearch(filterText: string, pageNumber: number, pageSize: number, sortBy: string, sortOrder: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', '' + pageNumber);
    params.set('pageSize', '' + pageSize);
    params.set('searchParam', filterText);
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    this.isLoading$.next(true);
    return this._restGateway.get('/order/searchOrders', params)
      .take(1)
      .subscribe(data => {
        let searchResult = new OrdersSearchResult();
        Object.assign(searchResult, data.json());
        this.searchResult$.next(searchResult);
        this.isLoading$.next(false);
      }, (error: Error) => {
        this.error$.next(error.message);
        this.isLoading$.next(false);
      });
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._paginator.pageIndex = 0;
    this._filterChange.next(filter);
  }

  constructor(private _exampleDatabase: ExampleDatabase, private _sort: MdSort, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Array<Order>> {
    console.log('connect datasource');
    const displayDataChanges = [
      this._filterChange,
      this._sort.mdSortChange,
      this._paginator.page
    ];

    Observable.merge(...displayDataChanges)
      .subscribe(() => {
        this._exampleDatabase.doSearch(
          this.filter,
          this._paginator.pageIndex,
          this._paginator.pageSize,
          this._sort.active,
          this._sort.direction
        );
      });
    return this._exampleDatabase.data$;
  }

  disconnect() {
    console.log('disconnect datasource');
  }
}
