(function () {
    'use strict';

    var serviceId = 'sessionRepository';
    angular.module('app').factory(serviceId, ['model', 'abstractRepository', sessionRepository]);

    function sessionRepository(model, AbstractRepository) {
        var entityName = model.entityNames.session;
        
        function Ctor(mgr) {
            this.serviceId = serviceId;
            this.entityName = entityName;
            this.manager = mgr;

            this.getPartials = getPartials;
        }

        AbstractRepository.extend(Ctor);

        return Ctor;

        function getPartials(forceRefresh) {
            var self = this;
            var orderBy = 'timeSlotId, level, speaker.firstName';
            var sessions;

            if (_areSessionsLoaded() && !forceRefresh) {
                sessions = this._getAllLocal('Session', orderBy);
                return self.$q.when(sessions);
            }

            return self.EntityQuery.from('Sessions')
                .select('id, title, code, speakerId, trackId, timeSlotId, roomId, level, tags, description')
                .orderBy(orderBy)
                .toType('Session')
                .using(self.manager)
                .execute()
                .to$q(querySucceeded, self._queryFailed);

            function querySucceeded(data) {
                sessions = data.results;
                _areSessionsLoaded(true);
                self.log('Retrieved session data', sessions.length, true);
                return sessions;
            }

            function _areSessionsLoaded(value) {
                return self._areItemsLoaded('sessions', value);
            }
        }
    }
})();