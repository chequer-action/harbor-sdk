import { type CreateAxiosDefaults } from 'axios';

export interface IHarborAuth {
  _injectAxios: (defaults: CreateAxiosDefaults) => CreateAxiosDefaults
}
