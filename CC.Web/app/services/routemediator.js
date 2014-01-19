(function () {
    'use strict';

    // Factory name is handy for logging
    var serviceId = 'routemediator';

    // Define the factory on the module.
    // Inject the dependencies. 
    // Point to the factory definition function.
    // TODO: replace app with your module name
    angular.module('app').factory(serviceId, ['$location', '$rootScope', 'config', 'logger', routemediator]);

    function routemediator($location, $rootScope, config, logger) {
        // Define the functions and properties to reveal.
        var service = {
            setRoutingHandlers: setRoutingHandlers
        };

        return service;

        function setRoutingHandlers() {
            updateDocTitle();
            handleRoutingError();
        }

        function handleRoutingError() {
            $rootScope.$on('$routeChangeError', function (e, current, previous, rejection) {
                var msg = 'Error routing: ' + (current && current.name) + ' ' + rejection.msg;
                logger.logWarning(msg, current, serviceId, true);
                $location.path('/');
            });
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeStart', function (e, current, previous) {
                var title = config.docTitle + ' ' + (current.title || ' ');
                $rootScope.title = title;
            });
        }
    }
})();