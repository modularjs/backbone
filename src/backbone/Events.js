define([
    'backbone/Events/on',
    'backbone/Events/once',
    'backbone/Events/off',
    'backbone/Events/trigger',
    'backbone/Events/stopListening',
    //
    'underscore/collections/each',
    'underscore/utility/uniqueId'
], function (on, once, off, trigger, stopListening, each, uniqueId) {
    "use strict";

    var Events = {
        on: on,
        once: once,
        off: off,
        trigger: trigger,
        stopListening: stopListening
    };


    var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

    // Inversion-of-control versions of `on` and `once`. Tell *this* object to
    // listen to an event in another object ... keeping track of what it's
    // listening to.
    each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeningTo = this._listeningTo || (this._listeningTo = {});
            var id = obj._listenId || (obj._listenId = uniqueId('l'));
            listeningTo[id] = obj;
            if (!callback && typeof name === 'object') {
                callback = this;
            }
            obj[implementation](name, callback, this);
            return this;
        };
    });

    return Events;

});