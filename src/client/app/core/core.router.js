(function() {
  'use strict'

  angular.module('app').config(configRoutes);

  function configRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/'
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
        controllerAs: 'vm',
        resolve: {
          auth: ['authservice', '$q', function(authservice, $q) {
            var user = authservice.getUserInfo();
            if (user) {
              return $q.when(user);
            } else {
              return $q.reject({authenticated: false});
            }
          }]
        }
      });
  }
})()