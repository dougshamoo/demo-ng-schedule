(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('authservice', authservice);

    authservice.$inject = ['$http', '$q', '$window', '$state'];

    function authservice($http, $q, $window, $state) {
      var service = {
        login: login,
        getUserInfo: getUserInfo,
        logout: logout
      };
      return service;

      ////////////////
      var userInfo;

      function login(userName, password) {
        var deferred = $q.defer();

        $http.post('/api/login', {
          userName: userName,
          password: password
        }).then(function(result) {
          console.log(result);
          userInfo = {
            userName: result.data.userName
          }

          // Could use sessionStorage to keep user logged in through page refresh
          // $window.sessionStorage['userInfo'] = JSON.stringify(userInfo);
          deferred.resolve(userInfo);
        }, function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }

      function getUserInfo() {
        return userInfo;
      }

      function logout() {
        userInfo = undefined;
        $state.go('login');
      }
    }
})();
