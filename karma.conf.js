module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      // VENDOR files
      'node_modules/angular/angular.js',

      //SRC files
      'app/src/scripts/**/*.js',

      //TEST files
      'test/spec/**/*.spec.js'
    ],
    colors: true
  });
};
