/**
 * @jsx React.DOM
 */
/**
 * Create by Drew on 1/14/2015
 */

var React = require('react');
var bootstrap = require('react-bootstrap'),
    NavBar = bootstrap.Navbar,
    Nav = bootstrap.Nav,
    NavItem = bootstrap.NavItem,
    DropdownButton = bootstrap.DropdownButton,
    MenuItem = bootstrap.MenuItem;

var Navigation = React.createClass({
    render: function () {
        return (
            <div>
                <NavBar>
                    <Nav>
                        <NavItem href="#">Something 1</NavItem>
                        <NavItem href="#">Something 2</NavItem>
                    </Nav>
                </NavBar>
            </div>
        );
    }
});

module.exports = Navigation;