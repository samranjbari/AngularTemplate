(function () {
    'use strict';

    var serviceId = 'lookupRepository';

    angular.module('app').factory(serviceId, ['model', 'abstractRepository', LookupRepository]);

    function LookupRepository(model, AbstractRepository) {
        var entityName = 'lookups';
        var entityNames = model.entityNames;

        function Ctor(mgr) {
            this.serviceId = serviceId;
            this.entityName = entityName;
            this.manager = mgr;

            this.getAll = getAll;
            this.setLookups = setLookups;
        }

        AbstractRepository.extend(Ctor);

        return Ctor;

        function getAll() {
            var self = this;
            return self.EntityQuery.from('Lookups')
                .using(self.manager)
                .execute()
                .to$q(querySucceeded, self._queryFailed);

            function querySucceeded(data) {
                self.log('Retrieved [Lookups]', data, true);
                return true;
            }
        }

        function setLookups() {
            this.lookupCachedData = {
                rooms: this._getAllLocal(entityNames.room, 'name'),
                tracks: this._getAllLocal(entityNames.track, 'name'),
                timeSlots: this._getAllLocal(entityNames.timeSlot, 'start')
            };
        }
    }
})();