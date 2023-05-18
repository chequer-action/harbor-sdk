import { type RepositoryClient } from './RepositoryClient';
import { type TagDTO } from '../types/dto/TagDTO';
import { BaseClient } from './BaseClient';
import { Artifact } from '../models/Artifact';
import { type ArtifactDTO } from '../types/dto/ArtifactDTO';

export class ArtifactClient extends BaseClient {
  public readonly repositoryClient: RepositoryClient;
  public readonly projectName: string;
  public readonly repositoryName: string;
  public readonly reference: string;
  public readonly registryName: string;
  private readonly referenceType: 'tag' | 'digest';

  public constructor(repositoryClient: RepositoryClient, referenceType: 'tag' | 'digest', reference: string) {
    super(repositoryClient);

    this.repositoryClient = repositoryClient;

    const { registryName, projectName, repositoryName } = repositoryClient;

    this.registryName = registryName;
    this.projectName = projectName;
    this.repositoryName = repositoryName;
    this.referenceType = referenceType;
    this.reference = reference;
  }

  private getLogName(): string {
    return `${this.projectName}/${this.repositoryName} ${this.reference}`;
  }

  public async getAsync(): Promise<Artifact> {
    const axios = await this._buildAxios();

    const { registryName, projectName, repositoryName, reference } = this;

    try {
      const { data: responseArtifact } = await axios.get<ArtifactDTO>(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}`);

      return new Artifact(
        registryName,
        projectName,
        repositoryName,
        responseArtifact,
      );
    } catch (e: unknown) {
      console.error(`Failed to find artifact: ${this.getLogName()}`);
      throw e;
    }
  }

  public async findAsync(): Promise<Artifact | null> {
    try {
      return await this.getAsync();
    } catch (e: unknown) {
      return null;
    }
  }

  public async removeAsync(): Promise<void> {
    const axios = await this._buildAxios();

    const { projectName, repositoryName, reference } = this;

    try {
      await axios.delete(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}`);
    } catch (e: unknown) {
      console.error(`Failed to remove artifact: ${this.getLogName()}`);
      throw e;
    }
  }

  public async pruneAsync(): Promise<void> {
    const artifact = await this.getAsync();

    if (artifact.tags.length !== 0) {
      console.log(`Prune artifact: artifact not removed (${artifact.tags.length} tags remaining): ${this.getLogName()}`);
      return;
    }

    await this.repositoryClient
      .artifact(artifact.digest)
      .removeAsync();
  }

  public async addTagAsync(tagName: string): Promise<void> {
    const axios = await this._buildAxios();

    const { projectName, repositoryName, reference } = this;

    try {
      const requestTag: TagDTO = {
        name: tagName,
      };

      await axios.post<TagDTO>(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/tags`, requestTag);
    } catch (e: unknown) {
      console.error(`Failed to add '${tagName}' tag: ${this.getLogName()}`);
      throw e;
    }
  }

  public async removeTagAsync(tagName: string): Promise<void> {
    const axios = await this._buildAxios();

    const { projectName, repositoryName, reference } = this;

    try {
      await axios.delete(`/projects/${projectName}/repositories/${repositoryName}/artifacts/${reference}/tags/${tagName}`);
    } catch (e: unknown) {
      console.error(`Failed to remove '${tagName}' tag: ${this.getLogName()}`);
      throw e;
    }
  }

  public async copyToAsync(copyToProjectName: string, copyToRepositoryName: string): Promise<void> {
    const axios = await this._buildAxios();

    const delimiter = this.referenceType === 'tag' ? ':' : '@';
    const from = `${this.projectName}/${this.repositoryName}${delimiter}${this.reference}`;

    try {
      await axios.post(`/projects/${copyToProjectName}/repositories/${copyToRepositoryName}/artifacts?from=${encodeURIComponent(from)}`);
    } catch (e: unknown) {
      console.error(`Failed to copy artifact to '${copyToProjectName}/${copyToRepositoryName}' from: ${this.getLogName()}`);
      throw e;
    }
  }
}
