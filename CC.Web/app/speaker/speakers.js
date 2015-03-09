(function () {
    'use strict';

    // Controller name is handy for logging
    var controllerId = 'speakers';

    // Define the controller on the module.
    // Inject the dependencies. 
    // Point to the controller definition function.
    angular.module('app').controller(controllerId, speakers);
    
    speakers.$inject = ['datacontext', 'common'];
    function speakers(datacontext, common) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        // Bindable properties and functions are placed on vm.
        vm.title = 'Speakers';
        vm.speakers = [];

        activate();

        function activate() {
            common.activateController([getSpeakers()], controllerId)
                .then(function () {
                    log('activated speakers view');
                });
        }

        function getSpeakers() {
            return datacontext.speaker.getPartials().then(function (data) {
                return vm.speakers = data;
            });
        }
    }
})();
