(function () {
    'use strict';

    var serviceId = 'speakerRepository';
    angular.module('app').factory(serviceId, ['model', 'abstractRepository', SpeakerRepository]);

    function SpeakerRepository(model, AbstractRepository) {
        var entityName = model.entityNames.speaker;

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
            var predicate = breeze.Predicate.create('isSpeaker', '==', true);
            var orderBy = 'firstName, lastName';
            var speakers = [];

            if (!forceRefresh) {
                speakers = this._getAllLocal('Speakers', orderBy, predicate);
                return this.$q.when(speakers);
            }

            return self.EntityQuery.from('Speakers')
                .select('id, firstName, lastName, imageSource')
                .orderBy(orderBy)
                .toType('Person')
                .using(this.manager)
                .execute()
                .to$q(querySucceeded, this._queryFailed);

            function querySucceeded(data) {
                speakers = data.results;
                for (var i = speakers.length; i--;) {
                    speakers[i].isSpeaker = true;
                }
                self.log('Retrieved speaker data', speakers.length, true);
                return speakers;
            }
        }
    }
})();