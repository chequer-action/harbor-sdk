import { type ArtifactClient } from '../../src';

describe('Artifact Client Test', (): void => {
  let client: ArtifactClient;

  beforeEach(function () {
  });

  afterEach((): void => {
  });

  test('1 is 1', () => {
    expect(1).toBe(1);
  });

  test('[1,2,3] is [1,2,3]', () => {
    expect([1, 2, 3]).toEqual(1);
  });
});
