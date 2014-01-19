(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        $routeProvider.when('/pass', {
            templateUrl: 'app/speaker/speakers.html',
            resolve: { fake: fakeAllow }
        });
        $routeProvider.when('/fail', {
            templateUrl: 'app/attendees/attendees.html',
            resolve: { fake: fakeReject },
            name: 'unathorized page'
        });

        fakeAllow.$inject = ['$q'];
        function fakeAllow($q) {
            var data = { x: 1 };
            var defer = $q.defer();
            defer.resolve(data);
            return defer.promise;
        }
        fakeReject.$inject = ['$q'];
        function fakeReject($q) {
            var defer = $q.defer();
            defer.reject({ msg: 'You are not authorized to view this page! ' });
            return defer.promise;
        }

        routes.forEach(function (r) {
            setRoute(r.url, r.config);
        });

        function setRoute(url, definition) {
            definition.resolve = angular.extend(definition.resolve || {}, {
                prime: prime
            });
            $routeProvider.when(url, definition);
            return $routeProvider;
        }

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    prime.$inject = ['datacontext'];
    function prime(dc) {
        return dc.prime();
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="icon-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: '/session',
                config: {
                    title: 'session',
                    templateUrl: 'app/session/sessions.html',
                    settings: {
                        nav: 2,
                        content: '<i class="icon-calendar"></i> Sessions'
                    }
                }
            }, {
                url: '/session/search/:search',
                config: {
                    title: 'sessions-search',
                    templateUrl: 'app/session/sessions.html',
                    settings: {}
                }
            }, {
                url: '/speakers',
                config: {
                    title: 'speakers',
                    templateUrl: 'app/speaker/speakers.html',
                    settings: {
                        nav: 3,
                        content: '<i class="icon-user"></i> Speakers'
                    }
                }
            },
            {
                url: '/attendees',
                config: {
                    title: 'attendees',
                    templateUrl: 'app/attendees/attendees.html',
                    settings: {
                        nav: 4,
                        content: '<i class="icon-group"></i> Attendees'
                    }
                }
            }
        ];
    }
})();