(function() {
    'use strict';

    angular
        .module('app.calendar')
        .controller('Calendar', Calendar);

    Calendar.$inject = ['dataservice', 'auth'];
    function Calendar(dataservice, auth) {
        var vm = this;
        vm.title = 'Calendar';

        // initialized in the activate function
        vm.uiConfig = {};
        vm.eventSources = [];
        vm.logDayOnClick = logDayOnClick;
        vm.logEventOnClick = logEventOnClick;


        activate();

        ////////////////

        // For debugging and demonstration, can do more interesting things here
        function logDayOnClick(date, jsEvent, view) {
            console.log('Clicked on: ' + date.format());
            console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            console.log('Current view: ' + view.name);
        }

        function logEventOnClick(calEvent, jsEvent, view) {
            console.log('Event: ' + calEvent.title);
            console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            console.log('Current view: ' + view.name);
        }

        function activate() {
            vm.uiConfig = {
                calendar:{
                    height: .70 * window.innerHeight,
                    editable: false,
                    header:{
                        left: 'month agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    dayClick: vm.logDayOnClick,
                    eventClick: vm.logEventOnClick,
                }
            };

            //TODO: get calendar events from DataService
            // vm.eventSources.push();
            dataservice.getCal(auth.userName)
            .then(function(result) {
                vm.eventSources.push(result);
            }, function(err) {
                console.log(err);
            });

        }
    }
})();