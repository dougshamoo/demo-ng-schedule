(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];

    function dataservice($http, $q) {
        var service = {
            getCal: getCal,
        };
        return service;

        ////////////////
        var cal = [];

        function getCal(user) {
          var deferred = $q.defer();

          $http.post('/api/cal', {
            userName: user
          })
          .then(function(result) {
            cal = result.data.calEvents;
            deferred.resolve(cal);
          }, function(err) {
            deferred.reject(err);
          });

          return deferred.promise;
        }
    }
})();
