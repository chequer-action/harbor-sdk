import { type ProjectClient } from './ProjectClient'
import { ArtifactClient } from './ArtifactClient'
import { BaseClient } from './BaseClient'

export class RepositoryClient extends BaseClient {
  private readonly _projectClient: ProjectClient

  public readonly projectName: string
  public readonly repositoryName: string

  public constructor (projectClient: ProjectClient, repositoryName: string) {
    super(projectClient)

    this._projectClient = projectClient

    this.projectName = projectClient.projectName
    this.repositoryName = repositoryName
  }

  public artifact (reference: string): ArtifactClient {
    return new ArtifactClient(this, reference)
  }
}
