import { LOGIN, LOGOUT } from './rest-api.commands';
import { RestfulCommand } from '../../../commands/restful.command';

export const apiLogin = (payload: any, baseCommand: RestfulCommand) => {
  baseCommand.payload.appendPair('payload', { text: payload.text });
  baseCommand.payload.appendPair('method', LOGIN);
  return baseCommand;
};

export const apiLogout = (payload: any, baseCommand: RestfulCommand) => {
  baseCommand.payload.appendPair('payload', {});
  baseCommand.payload.appendPair('method', LOGOUT);
  return baseCommand;
};
