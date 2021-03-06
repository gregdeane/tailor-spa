const webpackConfig = require('./webpack.test');

module.exports = function (config) {
  const _config = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [{
      pattern: './karma.shim.js',
      watched: false
    }],
    preprocessors: {
      './karma.shim.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['progress', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  };

  config.set(_config);
};
