import {updateUserProfile} from '../services/userService';
export function updateProfile(req, res, next) {
    return updateUserProfile(req.user._id, req.body).then((user)=>{
        return res.json(user);
    }).catch(next);
}