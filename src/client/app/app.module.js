(function() {
    'use strict';

    angular
        .module('app', [
            'app.core',

            'app.calendar',
            'app.login',
            'app.sidebar'
        ])
        .run(configAccess);

    configAccess.$inject = ['$rootScope', '$state'];
    function configAccess($rootScope, $state) {
      $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        console.log();
      });

      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        if (error.authenticated === false) {
          $state.go("login");
        }
      });
    }
})();