(function () {
    'use strict';

    var serviceId = 'abstractRepository';

    angular.module('app').factory(serviceId, ['common', AbstractRepository]);

    function AbstractRepository(common) {
        var EntityQuery = breeze.EntityQuery;
        var logError = common.logger.getLogFn(this.serviceId, 'error');

        function Ctor() {
            this.isLoaded = false;
            this.EntityQuery = EntityQuery;
        }

        Ctor.extend = function (repositoryCtor) {
            repositoryCtor.prototype = new Ctor();
            repositoryCtor.prototype.constructor = repositoryCtor;
        }

        Ctor.prototype._getAllLocal = _getAllLocal;
        Ctor.prototype._areItemsLoaded = _areItemsLoaded;
        Ctor.prototype._getLocalEntityCount = _getLocalEntityCount;
        Ctor.prototype._getInlineCount = _getInlineCount;
        Ctor.prototype._queryFailed = _queryFailed;
        Ctor.prototype.log = common.logger.getLogFn(this.serviceId);
        Ctor.prototype.$q = common.$q;

        return Ctor;

        function _getAllLocal(resource, ordering, predicate) {
            return EntityQuery.from(resource)
                .where(predicate)
                .orderBy(ordering)
                .using(this.manager)
                .executeLocally();
        }
        
        function _areItemsLoaded(key, value) {
            if (value === undefined) {
                return this.isLoaded;
            }

            return this.isLoaded = value;
        }

        function _getLocalEntityCount(resource) {
            var entities = EntityQuery.from(resource)
                            .using(this.manager)
                            .executeLocally();

            return entities.length;
        }

        function _getInlineCount(data) {
            return data.inlineCount;
        }

        function _queryFailed(error) {
            var msg = config.appErrorPrefix + 'Error getting data. ' + error.message;
            logError(msg, error);
            throw error;
        }
    }
})();