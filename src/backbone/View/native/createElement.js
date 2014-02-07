define([
    'backbone/View/native/$wrapEl'
], function ($wrapEl) {
    "use strict";

    /**
     * Native replacement of $("<div>") method, inspiried by backbone.native
     *
     * @param {String} tagName
     *
     */
    return function (html) {
        // Parse arbitrary HTML into an element.
        var div = document.createElement('div');
        div.innerHTML = html;
        var el = div.firstChild;
        div.removeChild(div.firstChild);
        return $wrapEl(el);
    };

});