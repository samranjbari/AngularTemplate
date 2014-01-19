(function () {
    'use strict';

    var serviceId = 'repositories';
    angular.module('app').factory(serviceId, ['$injector', repositories]);

    function repositories($injector) {
        var manager;
        var repoNames = ['attendee', 'lookup', 'session', 'speaker', 'dashboard'];

        var service = {
            repoNames: repoNames,
            getRepo: getRepo,
            init: init
        };

        return service;

        function getRepo(repoName) {
            var fullRepoName = repoName.toLowerCase() + 'Repository';
            var Repo = $injector.get(fullRepoName);
            return new Repo(manager);
        }

        function init(mgr) { manager = mgr; }
    }
})();