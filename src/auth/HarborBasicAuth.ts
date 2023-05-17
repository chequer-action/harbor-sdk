import { type IHarborAuth } from './IHarborAuth';
import { type CreateAxiosDefaults } from 'axios';

export class HarborBasicAuth implements IHarborAuth {
  private readonly username: string;
  private readonly password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  _injectAxios(defaults: CreateAxiosDefaults): CreateAxiosDefaults {
    const basicAuth = `${this.username}:${this.password}`;
    const basicAuthBase64 = Buffer.from(basicAuth, 'utf-8').toString('base64');

    return {
      ...defaults,
      auth: {
        username: this.username,
        password: this.password,
      },
      headers: {
        Authorization: `Basic ${basicAuthBase64}`,
      },
    };
  }
}
