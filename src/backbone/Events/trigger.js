/**
 *
 */
define(['backbone/Events/eventsApi', 'es5/Array/slice'], function (eventsApi, slice) {
    "use strict";


    // A difficult-to-believe, but optimized internal dispatch function for
    // triggering events. Tries to keep the usual cases speedy (most internal
    // Backbone events have 3 arguments).
    var triggerEvents = function(events, args) {
        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
        switch (args.length) {
        case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
        case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
        case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
        case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
        default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
        }
    };

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    return function(name) {
        if (!this._events) {
            return this;
        }
        var args = slice.call(arguments, 1);
        if (!eventsApi(this, 'trigger', name, args)) {
            return this;
        }
        var events = this._events[name];
        var allEvents = this._events.all;
        if (events) {
            triggerEvents(events, args);
        }
        if (allEvents) {
            triggerEvents(allEvents, arguments);
        }
        return this;
    };

});