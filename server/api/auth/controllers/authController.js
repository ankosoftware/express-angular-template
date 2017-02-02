import * as authService from '../services/authService';
import {ERROR_MESSAGES} from '../../../errors';

export function login(req, res, next) {
    return authService.login(req,res,next).then((user)=>{
        return res.json(user);
    }).catch(next);
}

export function logout(req, res, next){
    authService.logout(req, res).then(()=>{
        res.json({status:'OK'});
    }).catch(next);
}

export function register(req, res, next) {
    return authService.register(req, req.body.email, req.body.password).then((user)=>{
        return res.json(user);
    }).catch(next);
}

export function info(req, res) {
    if(req.user) {
        return res.json(req.user);
    }
    return res.status('401').json({error: ERROR_MESSAGES.NOT_AUTHORIZED});
}

export function authorized(req, res, next) {
    if(!req.user) {
        return res.status('401').json({error: ERROR_MESSAGES.NOT_AUTHORIZED});
    }
    next();
}

export function admin(req, res, next) {
    if(!req.user || req.user.role!=='admin') {
        return res.status('403').json({error: ERROR_MESSAGES.NOT_PERMITTED});
    }
    next();
}