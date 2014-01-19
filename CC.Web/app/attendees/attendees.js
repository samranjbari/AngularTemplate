(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'attendees';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['common', 'config', 'datacontext', attendees]);

    function attendees(common, config, datacontext) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var keyCodes = config.keyCodes;

        // Bindable properties and functions are placed on vm.
        vm.title = 'Attendees';
        vm.attendees = [];
        vm.attendeeCount = 0;
        vm.attendeeFilteredCount = 0;
        vm.searchText = '';
        vm.search = search;
        vm.pageChanged = pageChanged;
        vm.paging = {
            currentPage: 1,
            maxPagesToShow: 5,
            pageSize: 15
        };

        Object.defineProperty(vm.paging, 'pageCount', {
            get: function(){
                return Math.floor(vm.attendeeFilteredCount / vm.paging.pageSize) + 1;
            }
        });

        activate();

        function activate() {
            common.activateController([getAttendees()], controllerId)
                .then(function () {
                    log('activated attendees view');
                });
        }

        function getAttendeeCount() {
            return datacontext.attendee.getCount().then(function (data) {
                return vm.attendeeCount = data;
            });
        }

        function getAttendeeFilteredCount() {
            vm.attendeeFilteredCount = datacontext.attendee.getFilteredCount(vm.searchText);
        }

        function getAttendees() {
            return datacontext.attendee.getAll(false, vm.paging.currentPage, vm.paging.pageSize, vm.searchText).then(function (data) {
                vm.attendees = data;
                getAttendeeFilteredCount();
                if (!vm.attendeeCount) {
                    getAttendeeCount();
                }

                return data;
            });
        }

        function pageChanged(page) {
            if (!page) {
                return;
            }

            vm.paging.currentPage = page;
            getAttendees();
        }

        function search($event) {
            if ($event.keyCode == keyCodes.esc) {
                vm.searchText = '';
            }

            getAttendees();
        }
    }
})();
