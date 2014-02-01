/**
 *
 */
define(['underscore/objects/isEmpty', 'backbone/Events/off'], function (isEmpty, off) {
    "use strict";

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    return function(obj, name, callback) {
        var listeningTo = this._listeningTo;
        if (!listeningTo) {
            return this;
        }
        var remove = !name && !callback;
        if (!callback && typeof name === 'object') {
            callback = this;
        }
        if (obj) (listeningTo = {})[obj._listenId] = obj;
        for (var id in listeningTo) {
            obj = listeningTo[id];
            off.call(obj, name, callback, this);
            if (remove || isEmpty(obj._events)) {
                delete this._listeningTo[id];
            }
        }
        return this;
    };

});