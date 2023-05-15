import { type IHarborAuth } from './IHarborAuth'
import { type CreateAxiosDefaults } from 'axios'

export class HarborBasicAuth implements IHarborAuth {
  private readonly username: string
  private readonly password: string

  constructor (username: string, password: string) {
    this.username = username
    this.password = password
  }

  _injectAxios (defaults: CreateAxiosDefaults): CreateAxiosDefaults {
    return {
      ...defaults,
      auth: {
        username: this.username,
        password: this.password
      }
    }
  }
}
