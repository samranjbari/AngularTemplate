module.exports = function(config) {
  config.set({
    frameworks: ['ng-scenario'],

    files: [
      'e2e/*.js'
    ],

    urlRoot: '/__karma/',

    autoWatch: true,

    colors: true,

    logLevel: config.LOG_INFO,

    proxies: {
        '/': 'http://localhost:50926/test/e2e/angular-scenario/'
    },

    browsers: ['Chrome'],

    reporters: ['progress', 'junit'],

    junitReporter: {
      // will be resolved to basePath (in the same way as files/exclude patterns)
      outputFile: 'test-results.xml'
    },

	reportSlowerThan: 500,

    singleRun: false,

    plugins: [
      'karma-ng-scenario',
      'karma-chrome-launcher',
      'karma-junit-reporter',
    ]
  });
};
