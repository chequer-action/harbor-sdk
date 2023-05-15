import { type AxiosInstance } from 'axios'

export class BaseClient {
  private readonly _parent: BaseClient | undefined

  constructor (parent?: BaseClient) {
    this._parent = parent
  }

  protected async _buildAxios (): Promise<AxiosInstance> {
    if (this._parent === undefined) {
      throw new Error('Failed to build axios instance')
    }

    return await this._parent._buildAxios()
  }
}
