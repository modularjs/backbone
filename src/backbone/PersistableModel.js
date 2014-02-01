define([
    'backbone/RemoteModel',
    'underscore/utility/result',
    'backbone/util/urlError',
    'es5/URI/encodeURIComponent',
    'backbone/PersistableModel/save',
    'backbone/PersistableModel/destroy'
], function (RemoteModel, result, urlError, encodeURIComponent, save, destroy) {
    "use strict";

    var PersistableModel = RemoteModel.extend({

        // A model is new if it has never been saved to the server, and lacks an id.
        isNew: function() {
            return this.id == null;
        },

        // Default URL for the model's representation on the server -- if you're
        // using Backbone's restful methods, override this to change the endpoint
        // that will be called.
        url: function() {
            var base = result(this, 'urlRoot') || result(this.collection, 'url') || urlError();
            if (this.isNew()) {
                return base;
            }
            return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
        },

        save: save,
        destroy: destroy
    });

    return PersistableModel;
});