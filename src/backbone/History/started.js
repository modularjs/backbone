define([

], function () {
    "use strict";

    var started = false;

    return {
        isStarted: function () {
            return started;
        },
        setStarted: function () {
            started = true;
        },
        setStopped: function () {
            started = false;
        }
    }
});