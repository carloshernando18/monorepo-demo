module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 200],
    'subject-min-length': [2, 'always', 10],
    'body-min-length': [2, 'always', 10],
    'scope-enum': [2, 'always', ['auth', 'profile', 'directory']],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
      ],
    ],
  },
};
