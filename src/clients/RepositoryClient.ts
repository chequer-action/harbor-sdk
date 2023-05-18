import { type ProjectClient } from './ProjectClient';
import { ArtifactClient } from './ArtifactClient';
import { BaseClient } from './BaseClient';
import { Artifact } from '../models/Artifact';

export class RepositoryClient extends BaseClient {
  private readonly _projectClient: ProjectClient;

  public readonly registryName: string;
  public readonly projectName: string;
  public readonly repositoryName: string;

  public constructor(projectClient: ProjectClient, repositoryName: string) {
    super(projectClient);

    this._projectClient = projectClient;

    this.registryName = projectClient.registryName;
    this.projectName = projectClient.projectName;
    this.repositoryName = repositoryName;
  }

  public artifactByTag(tag: string): ArtifactClient {
    return new ArtifactClient(this, 'tag', tag);
  }

  public artifactByDigest(digest: string): ArtifactClient {
    return new ArtifactClient(this, 'digest', digest);
  }

  /**
   * @deprecated
   */
  public artifact(reference: string): ArtifactClient {
    const DIGEST_REGEX = /^sha256:[0-9a-fA-F]+$/;

    if (DIGEST_REGEX.test(reference)) {
      return this.artifactByDigest(reference);
    }

    return this.artifactByTag(reference);
  }
}
