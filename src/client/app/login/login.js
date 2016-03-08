(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);

    Login.$inject = ['authservice', '$state'];

    function Login(authservice, $state) {
        var vm = this;
        vm.title = 'Login';
        vm.user = '';
        vm.pass = '';
        vm.login = login;
        vm.error = '';

        // activate();

        ////////////////

        function login() {
            vm.error = '';
            authservice.login(vm.user, vm.pass)
            .then(function(result) {
                $state.go('calendar');
            }, function(err) {
                vm.error = err.data.error;
            });
        }

        // function activate() {
        // }
    }
})();
