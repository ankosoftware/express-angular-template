import passport from 'passport';
import passportLocal from 'passport-local';
import {findByEmail, logUserActivity, findById} from './api/user/services/userService';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    findByEmail(email).then((user)=>{
        if (!user) {
            return done(null, false, { message: 'Invalid Login' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Invalid Login' });
        }
        return done(null, user);
    }).catch((err)=>{
        if (err) { return done(err); }
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    logUserActivity(id).then(()=>{
        findById(id).then((user)=>{
            return done(null, user);
        }).catch((err)=>{
            return done(err.message);
        })
    }).catch((err)=>{
        return done(err.message);
    });
});
export default passport;


