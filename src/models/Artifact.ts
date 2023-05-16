import { type ArtifactDTO } from '../types/dto/ArtifactDTO';
import { type TagDTO } from '../types/dto/TagDTO';

export class Artifact {
  readonly projectName: string;
  readonly repositoryName: string;
  readonly digest: string;
  readonly tags: TagDTO[];

  constructor(projectName: string, repositoryName: string, dto: ArtifactDTO) {
    this.projectName = projectName;
    this.repositoryName = repositoryName;
    if (dto.digest === undefined) {
      throw new Error('Wrong ArtifactDTO: artifact dto should have digest');
    }

    this.digest = dto.digest;
    this.tags = dto.tags ?? [];
  }
}
