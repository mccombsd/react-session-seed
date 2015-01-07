/**
 * Created by Drew on 12/30/2014.
 */

var AppContsants = require('../constants/AppConstants'),
    ItemClient = require('../clients/ItemClient');


module.exports = {
    addItem: function (newItem) {
        this.dispatch(AppContsants.ADD_ITEM, newItem);
        ItemClient.add(newItem,
            function () {
                this.dispatch(AppContsants.ADDz_ITEM_SUCCESS);
            }.bind(this),
            function (err) {
                this.dispatch(AppContsants.ADD_ITEM_FAILURE, err);
            }.bind(this)
        );
    },

    updateItem: function (item) {
        this.dispatch(AppContsants.UPDATE_ITEM, {item: item});
    },
    deleteItem: function (item) {
        this.dispatch(AppContsants.DELETE_ITEM, {item: item});
    },

    loadItems: function () {
        this.dispatch(AppContsants.LOAD_ITEMS);
        ItemClient.load(
            function (items) {
                this.dispatch(AppContsants.LOAD_ITEMS_SUCCESS, items);
            }.bind(this),
            function (err) {
                this.dispatch(AppContsants.LOAD_ITEMS_FAILURE, err);
            }.bind(this)
        );
    }
};