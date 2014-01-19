(function () {
    'use strict';

    var controllerId = 'sessions';
    angular.module('app').controller(controllerId,
        ['common', 'datacontext', sessions]);

    function sessions(common, datacontext) {
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        vm.activate = activate;
        vm.title = 'sessions';
        vm.sessions = [];

        activate();

        function activate() {
            var promises = [getSessions()];
            common.activateController(promises, controllerId)
                .then(function () {
                    log('activated session view');
                });
        }

        function getSessions() {
            return datacontext.session.getPartials(false).then(function (data) {
                return vm.sessions = data;
            });
        }
    }
})();
