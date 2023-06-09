export interface ArtifactTagReference {
  type: 'tag'
  registry: string
  project: string
  repository: string
  tag: string
  reference: string
}

export interface ArtifactDigestReference {
  type: 'digest'
  registry: string
  project: string
  repository: string
  digest: string
  reference: string
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
      tag,
      reference: tag,
    };
  }

  const digestMatch = artifact.match(ARTIFACT_DIGEST_REFERENCE);
  if (digestMatch !== null) {
    const [, registry, project, repository, digest] = digestMatch;

    return {
      type: 'digest',
      registry,
      project,
      repository,
      digest,
      reference: digest,
    };
  }

  throw new Error(`Wrong artifact format ${artifact}`);
}
