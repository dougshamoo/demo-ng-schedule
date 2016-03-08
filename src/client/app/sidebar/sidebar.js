(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['authservice'];

    function Sidebar(authservice) {
        var vm = this;
        vm.title = 'Demo: ngSchedule';
        vm.links = [];
        vm.logout = logout;
        vm.auth = authservice.getUserInfo;

        activate();

        ////////////////

        function logout() {
            authservice.logout();
        }

        function activate() {
            vm.links = [
                {
                    name: 'My Calendar',
                    sref: 'calendar'
                },
                {
                    name: 'Something 1',
                    sref: 'home'
                },
                {
                    name: 'Something 2',
                    sref: 'home'
                },
                {
                    name: 'Something 3',
                    sref: 'home'
                }
            ];
        }
    }
})();