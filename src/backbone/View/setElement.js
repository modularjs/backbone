/**
 *
 */
define(['backbone/dollar'], function ($) {
    "use strict";

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    return  function(element, delegate) {
        if (this.$el) {
            this.undelegateEvents();
        }
        this.$el = element instanceof $ ? element : $(element);
        this.el = this.$el[0];
        if (delegate !== false) {
            this.delegateEvents();
        }
        return this;
    };
});