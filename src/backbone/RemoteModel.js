define([
    'backbone/Model',
    'backbone/sync',
    'backbone/RemoteModel/fetch'
], function (Model, backboneSync, fetch) {
    "use strict";

    var RemoteModel = Model.extend({
        fetch: fetch,
        sync: function () {
            return backboneSync.apply(this, arguments);
        },
        // **parse** converts a response into the hash of attributes to be `set` on
        // the model. The default implementation is just to pass the response along.
        parse: function(resp, options) {
            return resp;
        }
    });

    return RemoteModel;
});