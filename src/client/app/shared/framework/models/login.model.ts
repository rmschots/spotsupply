import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Model } from './model';
import { CreateUser } from '../../objects/account/create-user';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { LoginDetails } from '../../objects/account/login-details';
import { LoginUser } from '../../objects/account/login-user';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { DataStatus } from '../../services/gateway/data-status';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginModel extends Model implements OnInit {

  redirectUrl: string;
  loginUser$: Observable<LoginUser>;
  loginAvailable$: BehaviorSubject<DataStatus> = new BehaviorSubject(DataStatus.UNKNOWN);

  private _loginAvailable: DataStatus = DataStatus.UNKNOWN;

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService,
              private _router: Router) {
    super();
    let user$ = this._store.select('login');
    this.loginUser$ = user$.scan((accum: boolean, current: any) => {
      return (current && current.get('details')) || accum;
    }, false);
    this.loginUser$.subscribe((loginUser) => {
      if (!!loginUser) {
        this._setLoginAvailable(DataStatus.AVAILABLE);
      }
    });
  }

  ngOnInit(): void {
    this.loadAccount();
  }

  createUser(createUser: CreateUser): Observable<boolean> {
    return this._restGateway.post('/account/create', createUser)
      .map(
        () => {
          return true;
        }
      ).take(1);
  }

  login(loginUser: LoginDetails): Observable<boolean> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('username', loginUser.phoneOrEmail);
    params.set('password', loginUser.password);
    return this._restGateway.post('/account/login', loginUser, params).map(
      (payload: any) => {
        const payloadJS = this.convertRestResponse(payload);
        this._store.dispatch(SpotSupplyActions.cartRefresh(payloadJS.cart));
        this._store.dispatch(SpotSupplyActions.loginUser(payloadJS.user));
        return true;
      }
    ).take(1);
  }

  logout() {
    this._restGateway.get('/account/logout').map(
      () => {
        this._store.dispatch(SpotSupplyActions.logoutUser());
        return true;
      }
    ).take(1).subscribe(() => {
      console.log('logged out, redirecting to home...');
      this._router.navigate(['']);
      window.location.reload();
    });
  }

  updateEmail(email: string, currentPassword: string): Observable<boolean> {
    return this._restGateway.post('/account/updateEmail', {
      email: email,
      currentPassword: currentPassword
    })
      .map(
        (payload: any) => {
          const payloadJS = this.convertRestResponse(payload);
          this._store.dispatch(SpotSupplyActions.loginUser(payloadJS));
          return true;
        }
      ).take(1);
  }

  updatePhoneNumber(phoneNumber: string, currentPassword: string): Observable<boolean> {
    return this._restGateway.post('/account/updatePhoneNumber', {
      phoneNumber: phoneNumber,
      currentPassword: currentPassword
    })
      .map(
        (payload: any) => {
          const payloadJS = this.convertRestResponse(payload);
          this._store.dispatch(SpotSupplyActions.loginUser(payloadJS));
          return true;
        }
      ).take(1);
  }

  updatePassword(newPassword: string, currentPassword: string): Observable<boolean> {
    return this._restGateway.post('/account/updatePassword', {
      newPassword: newPassword,
      currentPassword: currentPassword
    })
      .map(
        (payload: any) => {
          const payloadJS = this.convertRestResponse(payload);
          this._store.dispatch(SpotSupplyActions.loginUser(payloadJS));
          return true;
        }
      ).take(1);
  }

  loadAccount() {
    if (this._loginAvailable === DataStatus.UNKNOWN) {
      this._setLoginAvailable(DataStatus.LOADING);
      this._restGateway.get('/account').subscribe(
        (payload: any) => {
          this._store.dispatch(SpotSupplyActions.loginUser(this.convertRestResponse(payload)));
        },
        () => {
          this._setLoginAvailable(DataStatus.UNAVAILABLE);
        }
      );
    }
  }

  private _setLoginAvailable(dataStatus: DataStatus) {
    this._loginAvailable = dataStatus;
    this.loginAvailable$.next(this._loginAvailable);
  }
}
