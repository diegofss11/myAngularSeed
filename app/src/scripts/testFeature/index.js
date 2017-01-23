var MODULE_NAME = 'testFeature',
  angular = require('angular'),
  service = require('./testFeature.service'),
  controller = require('./testFeature.controller'),
  component = require('./testFeature.component');

console.log('------> index.js from TestFeature loaded');

angular.module(MODULE_NAME, [])
.service('testFeatureService', service)
.controller('testFeatureController', controller)
.component('testFeatureComponent', component);

// controller.$inject = 'testFeatureService';

module.exports = MODULE_NAME;
