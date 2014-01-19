
(function () {
    'use strict';

    var serviceId = 'attendeeRepository';
    angular.module('app').factory(serviceId, ['model', 'abstractRepository', attendeeRepository]);

    function attendeeRepository(model, AbstractRepository) {
        var entityNames = model.entityNames;
        var entityName = entityNames.attendee;
        
        function Ctor(mgr) {
            this.serviceId = serviceId;
            this.entityName = entityName;
            this.manager = mgr;

            this.getAll = getAll;
            this.getFilteredCount = getFilteredCount;
            this.getCount = getCount;
        }

        AbstractRepository.extend(Ctor);

        return Ctor;

        function getAll(forceRefresh, page, size, nameFilter) {
            var self = this;
            var orderBy = 'firstName, lastName';
            var attendees = [];

            var take = size || 20;
            var skip = page ? (page - 1) * size : 0;

            if (self._areItemsLoaded() && !forceRefresh) {
                return self.$q.when(getByPage());
                //attendees = _getAllLocal('Attendees', orderBy);
                //return $q.when(attendees);
            }

            return self.EntityQuery.from('Persons')
                .select('id, firstName, lastName, imageSource')
                .orderBy(orderBy)
                .toType('Person')
                .using(self.manager)
                .execute()
                .to$q(querySucceeded, self._queryFailed);

            function getByPage() {
                var predicate = null;
                if (nameFilter) {
                    predicate = _fullNamePredicate(nameFilter);
                }

                var attendees = self.EntityQuery.from(entityNames.attendee)
                    .where(predicate)
                    .take(take)
                    .skip(skip)
                    .orderBy(orderBy)
                    .using(self.manager)
                    .executeLocally();

                return attendees;
            }

            function querySucceeded(data) {
                self._areItemsLoaded(true);
                self.log('Retrieved attendess data', data.results.length, true);
                return getByPage();
            }
        }

        function _fullNamePredicate(filterValue) {
            return breeze.Predicate
                .create('firstName', 'contains', filterValue)
                .or('lastName', 'contains', filterValue);
        }

        function getCount() {
            var self = this;
            if (self._areItemsLoaded()) {
                return self.$q.when(self._getLocalEntityCount(entityNames.attendee));
            }

            return self.EntityQuery.from('Persons').take(0).inlineCount()
                    .using(self.manager)
                    .execute()
                    .to$q(self._getInlineCount);
        }

        function getFilteredCount(nameFilter) {
            var predicate = _fullNamePredicate(nameFilter);

            var attendees = this.EntityQuery.from(entityNames.attendee)
                            .where(predicate)
                            .using(this.manager)
                            .executeLocally();

            return attendees.length;
        }
    }
})();