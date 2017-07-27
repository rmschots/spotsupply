import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Config } from '../../config/env.config';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class RestGatewayService {

  private _headers: Headers;

  constructor(private _http: Http, private _snackBar: MdSnackBar) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',

    };
    this._headers = new Headers(headerDict);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<Response> {
    return this._http.get(Config.REST_API + path, this.createOptions(params)).catch((e) => {
      return this._handleError(e);
    });
  }

  post(path: string, payload?: any, params: URLSearchParams = new URLSearchParams()): Observable<Response> {
    return this._http.post(Config.REST_API + path, payload, this.createOptions(params)).catch((e) => {
      return this._handleError(e);
    });
  }

  doDelete(path: string, params: URLSearchParams = new URLSearchParams()): Observable<Response> {
    return this._http.delete(Config.REST_API + path, this.createOptions(params)).catch((e) => {
      return this._handleError(e);
    });
  }

  private createOptions(params: URLSearchParams = new URLSearchParams()) {
    return {
      headers: this._headers,
      withCredentials: true,
      search: params
    };
  }

  private _handleError(e: any) {
    if (e.status === 412) {
      this._snackBar.open(e.json().message, null, {
        duration: 2000,
      });
    }
    return _throw(e.json());
  }
}
