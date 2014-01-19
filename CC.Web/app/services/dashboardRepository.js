(function () {
    'use strict';

    var serviceId = 'dashboardRepository';
    angular.module('app').factory(serviceId, ['abstractRepository', dashboardRepository]);

    function dashboardRepository(AbstractRepository) {

        function Ctor(mgr) {
            this.serviceId = serviceId;
            this.manager = mgr;

            this.getMessageCount = getMessageCount;
            this.getPeople = getPeople;
        }

        AbstractRepository.extend(Ctor);

        return Ctor;

        function getMessageCount() { return this.$q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return this.$q.when(people);
        }
    }
})();