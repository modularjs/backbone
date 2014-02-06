/**
 *
 */
define([
    'underscore/utility/result',
    'underscore/objects/isFunction',
    'underscore/functions/bind'
], function (result, isFunction, bind) {
    "use strict";

    // Cached regex to split keys for `delegate`.
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    return function(events) {
        if (!(events || (events = result(this, 'events')))) {
            return this;
        }
        this.undelegateEvents();
        for (var key in events) {
            var method = events[key];
            if (!isFunction(method)) {
                method = this[events[key]];
            }
            if (!method) {
                continue;
            }

            var match = key.match(delegateEventSplitter);
            var eventName = match[1], selector = match[2];
            method = bind(method, this);
            eventName += '.delegateEvents' + this.cid;

            if (selector === '') {
                this.$el.on(eventName, null, method);
            } else {
                this.$el.on(eventName, selector, method);
            }

        }
        return this;
    };
});