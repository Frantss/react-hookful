const hooks = [
  'useMountEffect',
  'useRerenderEffect',
  'useUnmountEffect',
].join('|');

module.exports = {
  rules: {
    'react-hooks/exhaustive-deps': [
      'error', {
        additionalHooks: `(${hooks})`
      }
    ]
  }
}