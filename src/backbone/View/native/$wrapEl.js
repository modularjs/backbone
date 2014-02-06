define([
    'backbone/View/native/attr'
], function (attr) {
    "use strict";

    /**
     * Wraps given element into JS object with all prototype methods, that backbone expects from $-wrapped object
     * @param element
     */
    var $ = function (element) {
        this[0] = element;
        this.length = 1;
    };

    $.prototype = {
        attr: attr
    };

    var facade = function (element) {
        return new $(element);
    };

    facade.isInstance = function (element) {
        return element instanceof $;
    };

    return facade;
});