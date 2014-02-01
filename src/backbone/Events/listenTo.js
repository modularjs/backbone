define([
    'underscore/utility/uniqueId',
    'backbone/Events/on'
], function (uniqueId, on) {
    "use strict";

    return function(obj, name, callback) {
        var listeningTo = this._listeningTo || (this._listeningTo = {});
        var id = obj._listenId || (obj._listenId = uniqueId('l'));
        listeningTo[id] = obj;
        if (!callback && typeof name === 'object') {
            callback = this;
        }
        on.call(obj, name, callback, this);
        return this;
    };
});