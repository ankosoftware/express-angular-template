import passport from 'passport';
import {createUser} from '../../user/services/userService';
import {NotAuthorizedError} from '../../../errors';

export function login(req, res, next){
    return new Promise((resolve, reject)=>{
        return passport.authenticate('local',
            (err, user)=>{
                if(err) {
                    return reject(err);
                }
                if(user && !user.disabled) {
                    return req.logIn(user, function(err) {
                        if(err) {
                            return reject(err);
                        }
                        return resolve(user);
                    })
                }
                return reject(new NotAuthorizedError('Invalid Login'));
            }
        )(req, res, next);
    })
}

export function register(req, email, password) {
    console.log(email, password);
    return createUser(email, password).then((user)=>{
        return new Promise((resolve, reject)=>{
            return req.logIn(user, function(err) {
                if(err) {
                    return reject(err);
                }
                return resolve(user);
            })
        })
    });
}

export function logout(req){
    return new Promise((resolve) => {
        req.logout();
        resolve();
    });
}

