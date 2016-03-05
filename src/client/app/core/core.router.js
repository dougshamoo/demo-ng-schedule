(function() {
  'use strict'

  angular.module('app').config(configRoutes);

  function configRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<div>Please Log in</div>'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'Login',
        controllerAs: 'vm'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'app/calendar/calendar.html',
        controller: 'Calendar',
        controllerAs: 'vm'
      });
  }
})()