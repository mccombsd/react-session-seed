/**
 * Created by Drew on 1/25/2015.
 */

/*
* Protects routes for users of role 'User'
*/



function isAuthorizedForRole(req, role) {
    if (req.isAuthenticated()) {
        return true;
    }

    return false;
};

exports.IsAuthorizedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log('Not authorized');
    //res.writeHead(401);
    res.status(401).json({ returnTo: 'somewhere'});
    res.end();
};