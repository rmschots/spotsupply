import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Model } from './model';
import { CreateUser } from '../../objects/account/create-user';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { LoginDetails } from '../../objects/account/login-details';
import { LoginUser } from '../../objects/account/login-user';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class LoginModel extends Model {

  redirectUrl: string;
  loginUser$: Observable<LoginUser>;

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    this.loginUser$ = this._store.select('login');
  }

  createUser(createUser: CreateUser): Observable<boolean> {
    return this._restGateway.post('/account/create', createUser)
      .map(
        () => {
          return true;
        }
      );
  }

  login(loginUser: LoginDetails): Observable<boolean> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', loginUser.phoneOrEmail);
    params.set('password', loginUser.password);
    return this._restGateway.post('/account/login', loginUser, params).map(
      (payload: any) => {
        this._store.dispatch(SpotSupplyActions.loginUser(this.convertRestResponse(payload)));
        return true;
      }
    );
  }

  logout() {
    this._restGateway.get('/account/logout').map(
      () => {
        this._store.dispatch(SpotSupplyActions.logoutUser());
        return true;
      }
    ).subscribe(() => {
      console.log('test');
    });
  }
}