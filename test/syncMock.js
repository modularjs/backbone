define([

], function () {
    "use strict";

    var env;

    QUnit.testStart(function () {
        env = this.config.current.testEnvironment;
    });

    // Capture the arguments to Backbone.sync for comparison.
    return function (method, model, options) {
        env.syncArgs = {
            method: method,
            model: model,
            options: options
        };
        Backbone.sync.apply(this, arguments);
    };
});