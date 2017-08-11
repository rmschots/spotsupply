import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
  ENV: 'PROD',
  REST_API: 'https://spotsupply.be:8090'
};

export = ProdConfig;

