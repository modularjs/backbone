define([
    'backbone/View/native/matchesSelector',
    'backbone/View/native/handlers',
    'backbone/View/native/parseEvent'
], function (matchesSelector, handlers, parseEvent) {
    "use strict";

    /**
     * Add event handlers to an element.
     * @see https://github.com/inkling/backbone.native/blob/master/backbone.native.js
     *
     * @param {Element} parentElement The element to bind event handlers to.
     * @param {string} eventName The event to bind, e.g. 'click'.
     * @param {string} selector (Optional) The selector to match when an event propagates up.
     * @param {function(Event, Element)} callback The function to call when the event is fired.
     */
    return function (parentElement, eventName, selector, callback){
        // Adjust arguments if selector was not provided.
        if (typeof selector === 'function'){
            callback = selector;
            selector = null;
        }

        var parts = parseEvent(eventName);
        eventName = parts.type || null;
        var namespace = parts.namespace || null;

        if (!eventName) return;

        var handler = callback;
        var originalCallback = callback;
        if (selector){
            // Event delegation handler to match a selector for child element events.
            handler = function(event){
                for (var el = event.target; el && el !== parentElement; el = el.parentElement){
                    if (matchesSelector.call(el, selector)){
                        // jQuery does not include the second argument, but we have included it
                        // for simplicity because 'this' will likely be bound to the view inside
                        // the callback, and as noted above, we cannot override 'currentTarget'.
                        var result = originalCallback.call(el, event, el);
                        if (result === false){
                            event.stopPropagation();
                            event.preventDefault();
                        }
                        return result;
                    }
                }
            };
        } else {
            // Standard event handler bound directly to the element.
            handler = function(event){
                var result = originalCallback.call(parentElement, event, parentElement);
                if (result === false){
                    event.stopPropagation();
                    event.preventDefault();
                }
                return result;
            };
        }

        parentElement.addEventListener(eventName, handler, false);

        // Save event handler metadata so that the handler can be unbound later.
        handlers.handlersFor(parentElement).push({
            eventName: eventName,
            callback: callback,
            handler: handler,
            namespace: namespace,
            selector: selector
        });
    };

});