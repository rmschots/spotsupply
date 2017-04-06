import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

import { RestfulCommand } from '../commands/restful.command';
import { Gateway } from './base.gateway';
import { Config } from '../../config/env.config';

@Injectable()
export class RestfulGateway extends Gateway {

  constructor(private http: Http) {
    super();
  }

  send(command: RestfulCommand): Observable<any> {
    return this.http.get(Config.REST_API + command.resource);
  }
}
