import { type IHarborAuth } from '../auth/IHarborAuth';
import { ProjectClient } from './ProjectClient';
import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';
import { BaseClient } from './BaseClient';

export class HarborClient extends BaseClient {
  // region private fields
  private _auth?: IHarborAuth;
  // endregion

  // region public fields
  public readonly registryName: string;
  // endregion

  // region constructor
  public constructor(host: string) {
    super();

    this.registryName = host;
  }
  // endregion

  // region Auth
  public setAuth(auth: IHarborAuth): void {
    this._auth = auth;
  }

  public auth(auth: IHarborAuth): this {
    this.setAuth(auth);

    return this;
  }
  // endregion

  // region Axios
  public async _buildAxios(): Promise<AxiosInstance> {
    const defaults = this._auth?._injectAxios({}) ?? {};

    const config: CreateAxiosDefaults = {
      ...defaults,
      baseURL: `https://${this.registryName}/api/v2.0`,
    };

    return axios.create(config);
  }
  // endregion

  // region Client builder
  public project(projectName: string): ProjectClient {
    return new ProjectClient(this, projectName);
  }
  // endregion
}
