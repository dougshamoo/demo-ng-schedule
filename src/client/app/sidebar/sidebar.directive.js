(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    // sidebar.$inject = [];

    function sidebar() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: 'Sidebar',
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            replace: true,
            // scope: true,
            templateUrl: 'app/sidebar/sidebar.html'
        };
        return directive;

        function link(scope, element, attrs) {
          // console.log('SCOPE:', scope);
          // console.log('ELEMENT:', element);
          // console.log('ATTRS:', attrs);
        }
    }
})();