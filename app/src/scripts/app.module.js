angular.module('workerSeeker', ['templates'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('/', {
      // url: '/',
      // controller: 'betController',
      // controllerAs: 'vmBet',
      // templateUrl: 'partials/Main.tpl.html'
  });

  $urlRouterProvider.otherwise('/');
