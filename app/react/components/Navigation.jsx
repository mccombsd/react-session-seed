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
    MenuItem = bootstrap.MenuItem,
    Auth = require('../../clients/Authentication');

var Navigation = React.createClass({
    render: function () {
        var link = <a href="/">react-session-seed</a>;
        var loginLogout;

        if (Auth.isAuthorized()) {
            loginLogout = <NavItem href="/user/logout">Logout</NavItem>;
        }
        else {
            loginLogout = <NavItem href="/login">Login</NavItem>
        }

        return (
            <div>
                <NavBar staticTop="true"  brand={link}>
                    <Nav>
                        <NavItem href="/itemlist">Item List</NavItem>
                        <NavItem href="/private">Private</NavItem>
                    </Nav>
                    <Nav right="true">
                        {loginLogout}
                    </Nav>
                </NavBar>
            </div>
        );
    }
});

module.exports = Navigation;