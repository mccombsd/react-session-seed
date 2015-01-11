/**
 * @jsx React.DOM
 */
/**
 * Create by Drew 1/6/2015
 */

var React = require('react/addons'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ItemList = React.createClass({
    mixins: [
        FluxMixin,
        StoreWatchMixin('ItemStore'),
        React.addons.LinkedStateMixin
    ],

    getStateFromFlux: function () {
        var flux = this.getFlux();

        return {
            'items': flux.store('ItemStore').getState().items,
            'addText': 'Initial value'
        };
    },

    render: function () {
        var items = this.state.items;
        var itemNodes = items.map(function (item) {
            return <div className="list-group-item">{item.name}</div>;
        });

        return (
            <div>
                <div>
                    <a className="btn btn-default" href="/">Home</a>
                </div>
                <h3>{'Number of items: ' + items.length}</h3>
                <div className="list-group">
                    {itemNodes}
                </div>
                <div className="form-group form-inline">
                    <input className="form-control" type="text" valueLink={this.linkState('addText')} />
                    <button className="btn" onClick={this.addItem}>Add</button>
                </div>
            </div>
        );
    },

    componentDidMount: function () {
        this.getFlux().actions.loadItems();
    },

    addItem: function () {
        this.getFlux().actions.addItem({ name: this.state.addText });
        this.setState({'addText': ''});
    }
});

module.exports = ItemList;