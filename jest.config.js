/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    moduleFileExtensions: ['js', 'ts'],
    transformIgnorePatterns: ['./node_modules/'],
    verbose: true,
  };
};
