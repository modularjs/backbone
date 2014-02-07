define([
    'underscore/objects/keys',
    'underscore/collections/each'
], function (keys, each) {
    "use strict";

    /**
     * Add attributes to the element.
     *
     * @param {Object} attributes A set of attributes to apply to the element.
     * @return {$} This instance.
     */
    return function (attrs) {
        each(keys(attrs), function(attr){
            switch (attr){
            case 'html':
                this[0].innerHTML = attrs[attr];
                break;
            case 'text':
                this[0].textContent = attrs[attr];
                break;
            case 'class':
                this[0].className = attrs[attr];
                break;
            default:
                this[0].setAttribute(attr, attrs[attr]);
                break;
            }
        }, this);
        return this;
    };
});