/**
 * Created by Drew on 1/10/2015.
 */

module.exports = {
    willTransitionTo: function (transition) {
        console.log('Authentication.willTransitionTo');
        transition.redirect('/login');
    }
}
