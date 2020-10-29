export default {
  coveragePathIgnorePatterns: ['/node_modules/', '/index.(j|t)sx?/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
