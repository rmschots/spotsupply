import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AsyncService } from './../base.async-service';
import { RestfulCommand } from '../../commands/restful.command';
import { JsonPayload } from '../../commands/payloads/json.command.payload';
import { Observable, Observer } from 'rxjs';
import { buildAPICommand } from './index';
import { RestfulGateway } from '../../gateways/restful.gateway';

@Injectable()
export class SpotsupplyAPIService extends AsyncService {
  constructor(private _restfulGateway: RestfulGateway, private _store: Store<any>) {
    super();
  }

  process(action: Action) {
    let baseCommand = new RestfulCommand();
    baseCommand.payload = new JsonPayload();
    baseCommand.gateway = this._restfulGateway;
    let commandBuilder = buildAPICommand(action);
    if (!commandBuilder) {
      console.warn('This command is not supported');
      return Observable.create((obs: Observer<any>) => obs.complete());
    } else {
      return commandBuilder(baseCommand).invoke();
    }
  }
}
