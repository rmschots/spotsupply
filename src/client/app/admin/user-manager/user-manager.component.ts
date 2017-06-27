import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { Unsubscribable } from '../../shared/components/unsubscribable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoginUser } from '../../shared/objects/account/login-user';
import { UsersSearchResult } from '../../shared/objects/search/users-search-result';

@Component({
  moduleId: module.id,
  selector: 'ss-user-manager',
  templateUrl: 'user-manager.component.html',
  styleUrls: ['user-manager.component.css']
})
export class UserManagerComponent extends Unsubscribable {

  filterText: string = '';
  currentFilter: string;
  currentPage: number = 0;
  pagesArray: number[] = [];
  isLoading: boolean = false;
  isLoaded: boolean = false;
  usersSubject: BehaviorSubject<Array<LoginUser>> = new BehaviorSubject([]);

  constructor(private _restGateway: RestGatewayService) {
    super();
    console.log('user manager');
    this.changePage(this.currentPage);
  }

  filterChanged() {
    this.changePage(0);
  }

  changePage(pageNumber: number) {
    if (this.isLoading) {
      return null;
    }
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', '' + pageNumber);
    params.set('pageSize', '10');
    params.set('searchParam', this.filterText);
    this.isLoading = true;
    return this._restGateway.get('/account/searchUsersByPage', params)
      .take(1)
      .subscribe(data => {
        this.isLoading = false;
        let searchResult = new UsersSearchResult();
        Object.assign(searchResult, data.json());
        this.usersSubject.next(searchResult.users);
        this.pagesArray = Array.from(Array(searchResult.pages).keys());
        this.currentPage = searchResult.page;
        this.currentFilter = searchResult.filter;
        this.isLoaded = true;
      });
  }

  hasUsers() {
    return this.usersSubject.map(users => {
      return !!users && users.length > 0;
    });
  }
}
