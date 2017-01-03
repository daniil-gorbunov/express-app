const
    LocalStrategy = require('passport-local').Strategy,
    User = require('models/user'),
    bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {

            User.findOne({'username': username},
                function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    if (!isValidPassword(user, password)) {
                        return done(null, false, req.flash('message', 'Invalid Password'));
                    }
                    return done(null, user);
                }
            );
        })
    );

    const isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    }

};