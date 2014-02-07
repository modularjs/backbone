define([
    'backbone/View/native/attr',
    'backbone/View/native/on',
    'backbone/View/native/off',
    'underscore/collections/each'
], function (attr, on, off, each) {
    "use strict";

    /**
     * Wraps given element into JS object with all prototype methods, that backbone expects from $-wrapped object
     * @param element
     * @param context
     */
    var $ = function (element, context) {
        context = context || document;


        // Call as a constructor if it was used as a function.
        if (!(this instanceof $)){
            return new $(element, context);
        }

        if (!element){
            this.length = 0;
        } else if (typeof element === 'string'){
            if (/^\s*</.test(element)){
                // Parse arbitrary HTML into an element.
                var div = document.createElement('div');
                div.innerHTML = element;
                this[0] = div.firstChild;
                div.removeChild(div.firstChild);
                this.length = 1;
            } else {
                element = context.querySelector(element);

                // Length must be 0 if no elements found.
                if (element !== null){
                    this[0] = element;
                    this.length = 1;
                } else {
                    this.length = 0;
                }
            }
        } else {
            // This handles both the 'Element' and 'Window' case, as both support
            // event binding via 'addEventListener'.
            this[0] = element;
            this.length = 1;
        }
    };

    $.prototype = {
        attr: attr,
        /**
         * Bind an event handler to this element.
         *
         * @param {string} eventName The event to bind, e.g. 'click'.
         * @param {string} selector (Optional) The selector to match when an event propagates up.
         * @param {function(Event, Element)} callback The function to call when the event is fired.
         */
        on: function(eventName, selector, callback){
            on(this[0], eventName, selector, callback);
            return this;
        },

        /**
         * Unbind an event handler to this element.
         *
         * @param {string} eventName (Optional) The event to unbind, e.g. 'click'.
         * @param {string} selector (Optional) The selector to unbind.
         * @param {function(Event, Element)} callback (Optional) The function to unbind.
         */
        off: function(eventName, selector, callback){
            off(this[0], eventName, selector, callback);
            return this;
        },

        find: function (selector) {
            var found = this[0].querySelectorAll(selector);
            var firstFound = found.length > 0 ? found[0] : null;
            return new $(firstFound);
        },

        html: function () {
            return this[0].innerHTML;
        },

        trigger: function (eventName, eventData) {
            var event = new window.Event(eventName, {
                bubbles: true
            });
            event.eventName = eventName;
            event.memo = eventData || { };
            this[0].dispatchEvent(event);
            return this;
        },

        get: function (index) {
            return this[index];
        },
        has: function (selector) {
            return this.find(selector).length > 0;
        },
        is: function (selector) {
            var all = document.querySelectorAll(selector);
            var isFound = false;
            each(all, function (el) {
                if (el === this[0]) {
                    isFound = true;
                }
            }, this);
            return isFound;
        }
    };

    var facade = function (element) {
        return new $(element);
    };

    facade.isInstance = function (element) {
        return element instanceof $;
    };

    return facade;
});