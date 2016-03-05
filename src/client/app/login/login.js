(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    // Login.$inject = [];

    /* @ngInject */
    function Login() {
        var vm = this;
        vm.title = 'Login';

        activate();

        ////////////////

        function activate() {
        }
    }
})();