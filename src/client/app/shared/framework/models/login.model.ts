import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { Config } from '../../config/env.config';
import { Model } from './model';
import { CreateUser } from '../../objects/account/create-user';

@Injectable()
export class LoginModel extends Model {

  constructor(protected _store: Store<any>,
              private http: Http) {
    super();
  }

  createUser(createUser: CreateUser): Observable<boolean> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    let headers: Headers = new Headers(headerDict);
    let options: RequestOptionsArgs = {
      headers: headers
    };
    return this.http.post(Config.REST_API + '/account/create', createUser, options).map(
      () => {
        return true;
      }
    );
  }
}
