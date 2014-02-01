/**
 *
 */
define([
    'backbone/Collection',
    'backbone/RemoteModel',
    'backbone/RemoteCollection/fetch',
    'backbone/sync'
], function (Collection, RemoteModel, fetch, backboneSync) {
    "use strict";

    var RemoteCollection = Collection.extend({
        model: RemoteModel,
        fetch: fetch,
        // Proxy `Backbone.sync` by default.
        sync: function() {
            return backboneSync.apply(this, arguments);
        }
    });

    return RemoteCollection;

});