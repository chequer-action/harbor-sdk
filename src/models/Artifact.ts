import { type ArtifactDTO } from '../types/dto/ArtifactDTO';
import { type TagDTO } from '../types/dto/TagDTO';

export class Artifact {
  public readonly registryName: string;
  public readonly projectName: string;
  public readonly repositoryName: string;
  public readonly digest: string;
  public readonly tags: TagDTO[];

  public constructor(registryName: string, projectName: string, repositoryName: string, dto: ArtifactDTO) {
    this.registryName = registryName;
    this.projectName = projectName;
    this.repositoryName = repositoryName;
    if (dto.digest === undefined) {
      throw new Error('Wrong ArtifactDTO: artifact dto should have digest');
    }

    this.digest = dto.digest;
    this.tags = dto.tags ?? [];
  }

  public toDigestReference(): string {
    return `${this.registryName}/${this.projectName}/${this.repositoryName}@${this.digest}`;
  }
}
