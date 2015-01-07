/**
 * Created by Drew on 12/26/2014.
 */

var Fluxxor = require('fluxxor'),
    AppConstants = require('../constants/AppConstants');

var itemStore = Fluxxor.createStore({
    initialize: function () {
        this.items = [];
        this.loading = false;
        this.loadingError = null;

        this.bindActions(
            AppConstants.ADD_ITEM, this.addItem,
            AppConstants.UPDATE_ITEM, this.updateItem,
            AppConstants.DELETE_ITEM, this.deleteItem,

            AppConstants.LOAD_ITEMS, this.loadItems,
            AppConstants.LOAD_ITEMS_SUCCESS, this.loadItemsSuccess,
            AppConstants.LOAD_ITEMS_FAILURE, this.loadItemsFailure
        );
    },

    addItem: function (newItem) {
        console.log('itemStore.addItem: ' + newItem.name);
        this.items.push(newItem);
        this.emit('change');
    },

    addItemSuccess: function () {
        //no need to emit a change since it's been applied already
    },

    addItemFailure: function () {
        //TODO: how to handle adding failure?
    },

    deleteItem: function (item) {
        console.log('itemStore.deleteItem: ' + item);
        this.emit('change');
    },

    updateItem: function (item) {
        console.log('itemStore.updateItem: ' + item);
        this.emit('change');
    },

    loadItems: function () {
        this.loading = true;
        this.emit('change');
    },

    loadItemsSuccess: function (items) {
        this.items = items;
        this.loading = false;
        this.emit('change');
    },

    loadItemsFailure: function () {
        this.loading = false;
        this.error = 'error';
        this.emit('change');
    },

    getState: function () {
        return {
            items: this.items,
            loading: this.loading,
            loadingError: this.loadingError
        };
    }
});

module.exports = itemStore;