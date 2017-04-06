import { Action } from '@ngrx/store';

import { apiLogin, apiLogout } from './command-builders/rest-api.command-builder';
import { LOGIN, LOGOUT } from './command-builders/rest-api.commands';
import { RestfulCommand } from '../../commands/restful.command';

const builders = new Map<string, CommandBuilder>();

export interface CommandBuilder {
  (payload: any, baseCommand: RestfulCommand): RestfulCommand;
}

export const registerCommandBuilder = (action: string, command: CommandBuilder) => {
  builders.set(action, command);
};

export const buildAPICommand = (action: Action) => {
  const type = action.type;
  if (builders.has(type)) {
    return builders.get(type)
      .bind(null, action.payload);
  }
  return null;
};

registerCommandBuilder(LOGIN, apiLogin);
registerCommandBuilder(LOGOUT, apiLogout);
