/**
 *
 */
define([], function () {
    "use strict";

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    return function() {

        this.$el.off('.delegateEvents' + this.cid);
        return this;

    };
});