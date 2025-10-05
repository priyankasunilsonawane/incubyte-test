module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/steps/**/*.ts'],
    paths: ['tests/features/**/*.feature'],
    format: ['progress'],
    worldParameters: {},
    require: [
      'tests/steps/**/*.ts',
      'tests/support/hooks.ts'
    ],
    default: {
      timeout: 5000,

    },
    reporter: [
      ['list'],
      ['html']
    ],
    use: {
      video: 'on-first-retry',
      trace: 'on-first-retry',
      screenshot: 'only-on-failure'
    },
  }
};
