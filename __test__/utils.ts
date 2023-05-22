import {
  type ArtifactClient,
  type ArtifactDigestReference,
  type ArtifactTagReference,
  HarborClient,
  type IHarborAuth,
} from '../src';

export function requiredEnv<T extends string>(...envs: T[]): Record<T, string> {
  const outputs = {} as unknown as Record<T, string>;

  for (const env of envs) {
    const value = process.env[env];
    if (value === undefined) {
      throw new Error(`Require ${env} environment variable to test`);
    }

    outputs[env] = value;
  }

  return outputs;
}

export function buildArtifactClient(auth: IHarborAuth, reference: ArtifactTagReference | ArtifactDigestReference): ArtifactClient {
  return new HarborClient(reference.registry)
    .auth(auth)
    .project(reference.project)
    .repository(reference.repository)
    .artifactByReference(reference.type, reference.reference);
}
