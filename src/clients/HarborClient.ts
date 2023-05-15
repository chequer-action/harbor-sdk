import { type IHarborAuth } from '../auth/IHarborAuth'
import { ProjectClient } from './ProjectClient'
import axios, { type AxiosInstance } from 'axios'
import { BaseClient } from './BaseClient'

export class HarborClient extends BaseClient {
  // region private fields
  private _auth?: IHarborAuth

  // endregion

  // region public fields
  public readonly host: string
  // endregion

  // region constructor
  public constructor (host: string) {
    super()

    this.host = host
  }

  // endregion

  // region Auth
  public setAuth (auth: IHarborAuth): void {
    this._auth = auth
  }

  public auth (auth: IHarborAuth): this {
    this.setAuth(auth)

    return this
  }

  // endregion

  // region Axios
  public async _buildAxios (): Promise<AxiosInstance> {
    const defaults = this._auth?._injectAxios({}) ?? {}

    const config = {
      baseURL: `https://${this.host}/api/v2.0`,
      defaults
    }

    return axios.create(config)
  }

  // endregion

  // region Client builder
  public project (projectName: string): ProjectClient {
    return new ProjectClient(this, projectName)
  }

  // endregion
}
