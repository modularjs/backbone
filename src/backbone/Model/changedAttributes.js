/**
 *
 */
define(['underscore/objects/clone', 'underscore/objects/isEqual'], function (clone, isEqual) {
    "use strict";

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    return function (diff) {
        if (!diff) {
            return this.hasChanged() ? clone(this.changed) : false;
        }
        var val, changed = false;
        var old = this._changing ? this._previousAttributes : this.attributes;
        for (var attr in diff) {
            if (isEqual(old[attr], (val = diff[attr]))) {
                continue;
            }
            (changed || (changed = {}))[attr] = val;
        }
        return changed;
    };
});