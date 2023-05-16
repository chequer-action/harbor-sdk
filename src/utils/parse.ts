export interface ArtifactTagReference {
  type: 'tag'
  registry: string
  project: string
  repository: string
  tag: string
}

export interface ArtifactDigestReference {
  type: 'digest'
  registry: string
  project: string
  repository: string
  digest: string
}

const ARTIFACT_TAG_REFERENCE = /^([\w.-]+)\/([\w.-]+)\/([\w.-]+):(.+)$/;
const ARTIFACT_DIGEST_REFERENCE = /^([\w.-]+)\/([\w.-]+)\/([\w.-]+)@(.+)$/;

export function parseArtifact(artifact: string): ArtifactTagReference | ArtifactDigestReference {
  const tagMatch = artifact.match(ARTIFACT_TAG_REFERENCE);
  if (tagMatch !== null) {
    const [, registry, project, repository, tag] = tagMatch;

    return {
      type: 'tag',
      registry,
      project,
      repository,
      tag
    };
  }

  const digestMatch = artifact.match(ARTIFACT_DIGEST_REFERENCE);
  if (digestMatch !== null) {
    const [, registry, project, repository, digest] = ARTIFACT_TAG_REFERENCE as unknown as string[];

    return {
      type: 'digest',
      registry,
      project,
      repository,
      digest
    };
  }

  throw new Error(`Wrong artifact format ${artifact}`);
}
