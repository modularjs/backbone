define([
    'underscore/utility/uniqueId',
    'backbone/Events/once'
], function (uniqueId, once) {
    "use strict";

    return function(obj, name, callback) {
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var id = obj._listenId || (obj._listenId = uniqueId('l'));
        listeningTo[id] = obj;
        if (!callback && typeof name === 'object') {
            callback = this;
        }
        once.call(obj, name, callback, this);
        return this;
    };
});