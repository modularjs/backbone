/**
 *
 */
define([
    'underscore/objects/extend',
    'underscore/objects/isFunction',
    'underscore/objects/isString',
    'underscore/collections/each',
    'jqlite/events/delegateEvents',
    'jqlite/events/undelegateEvents',
    'jqlite/dom/createElement',
    'jqlite/dom/find',
    'jqlite/events/trigger'
], function (extend, isFunction, isString, each, delegateEvents, undelegateEvents, createElement, find, trigger) {
    "use strict";

    var root = window;

    var addDollarMethods = function (elementsCollection) {
        return extend(elementsCollection, {
            on: function (eventName, selector, handler) {
                if (isFunction(selector)) {
                    handler = selector;
                    selector = null;
                }

                each(elementsCollection, function (element) {
                    delegateEvents(element, eventName, selector, handler);
                });

            },
            off: function (eventName) {

                each(elementsCollection, function (element) {
                    undelegateEvents(element, eventName);
                });

            },
            find: function (selector) {
                return addDollarMethods(find(elementsCollection[0], selector));
            },
            is: function (selector) {
                var all = find(document, selector);
                var isFound = false;
                each(all, function (el) {
                    if (el === elementsCollection[0]) {
                        isFound = true;
                    }
                });
                return isFound;
            },
            has: function (selector) {
                return elementsCollection.find(selector).length > 0;
            },
            html: function () {
                return elementsCollection[0].innerHTML;
            },
            trigger: function (eventName, eventData) {
                each(elementsCollection, function (element) {
                    trigger(element, eventName, eventData);
                });
            }
        });
    };

    return root.jQuery || root.Zepto || root.ender || root.$ || function (element) {
        var elements;
        var existingElements;

        var createdElement = createElement(element);

        if (createdElement) {
            elements = [createdElement];
        } else {

            if (isString(element)) {
                existingElements = find(document, element);
            } else {
                existingElements = [];
            }

            if (existingElements.length > 0) {
                elements = [existingElements[0]];
            } else {
                elements = [];
            }

        }


        return addDollarMethods(elements);
    };
});