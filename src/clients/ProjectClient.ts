import { type HarborClient } from './HarborClient';
import { RepositoryClient } from './RepositoryClient';
import { BaseClient } from './BaseClient';

export class ProjectClient extends BaseClient {
  private readonly _harborClient: HarborClient;
  public readonly projectName: string;

  public constructor(harborClient: HarborClient, projectName: string) {
    super(harborClient);

    this._harborClient = harborClient;
    this.projectName = projectName;
  }

  public repository(repositoryName: string): RepositoryClient {
    return new RepositoryClient(this, repositoryName);
  }
}
