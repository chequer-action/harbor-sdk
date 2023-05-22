import dotenv from 'dotenv';
import { HarborBasicAuth, type IHarborAuth, parseArtifact } from '../src';
import { buildArtifactClient, requiredEnv } from './utils';

describe('Find artifact', () => {
  dotenv.config({
    path: '.test.env',
  });

  let auth: IHarborAuth;

  beforeAll(() => {
    const { HARBOR_USERNAME, HARBOR_PASSWORD } = requiredEnv('HARBOR_USERNAME', 'HARBOR_PASSWORD');

    auth = new HarborBasicAuth(HARBOR_USERNAME, HARBOR_PASSWORD);
  });

  describe('[Test1] Find artifact', () => {
    test('Find artifact by digest', async () => {
      const { TEST1_ARTIFACT_DIGEST_REFERENCE } = requiredEnv('TEST1_ARTIFACT_DIGEST_REFERENCE');
      console.log('Ref: ', TEST1_ARTIFACT_DIGEST_REFERENCE);

      const reference = parseArtifact(TEST1_ARTIFACT_DIGEST_REFERENCE);
      await buildArtifactClient(auth, reference).getAsync();
    });

    test('Find artifact by tag', async () => {
      const { TEST1_ARTIFACT_TAG_REFERENCE } = requiredEnv('TEST1_ARTIFACT_TAG_REFERENCE');
      console.log('Ref: ', TEST1_ARTIFACT_TAG_REFERENCE);

      const reference = parseArtifact(TEST1_ARTIFACT_TAG_REFERENCE);
      await buildArtifactClient(auth, reference).getAsync();
    });
  });
});
