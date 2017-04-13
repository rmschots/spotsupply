import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Config } from '../../config/env.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestGatewayService {

  private _headers: Headers;

  constructor(private _http: Http) {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',

    };
    this._headers = new Headers(headerDict);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<Response> {
    return this._http.get(Config.REST_API + path, this.createGetOptions(params)).catch((e) => {
      return Observable.throw(
        new Error(JSON.parse(e._body).message)
      );
    });
  }

  post(path: string, payload?: any, params: URLSearchParams = new URLSearchParams()): Observable<Response> {
    return this._http.post(Config.REST_API + path, payload, this.createPostOptions(params)).catch((e) => {
      return Observable.throw(
        new Error(JSON.parse(e._body).message)
      );
    });
  }

  private createPostOptions(params: any = new URLSearchParams()) {
    return {
      headers: this._headers,
      withCredentials: true,
      search: params
    };
  }

  private createGetOptions(params: URLSearchParams = new URLSearchParams()) {
    return {
      headers: this._headers,
      withCredentials: true,
      search: params
    };
  }
}
