/**
 *
 */
define([
    'backbone/RemoteCollection',
    'backbone/PersistableModel',
    'backbone/PersistableCollection/create'
], function (RemoteCollection, PersistableModel, create) {
    "use strict";

    var PersistableCollection = RemoteCollection.extend({
        model: PersistableModel,
        create: create
    });

    return PersistableCollection;

});