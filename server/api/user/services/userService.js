import User from '../../../models/User';

export function createUser(email, password) {
        let user = new User({email: email, password: password});
        return user.save();
}

export function findByEmail (email) {
    return User.findOne({email: email});
}

export function findById (userId) {
    return User.findById(userId, '-salt -hashed_password');
}

export function updateUserProfile (userId, userData) {
    return findById(userId).then((user)=>{
            userData.name && (user.name = userData.name);
            userData.email && (user.email = userData.email);
            return user.save();
    });
}

export function findByRestoreToken(token) {
     return User.findOne({resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }});
}

export function logUserActivity(userId) {
        return User.update({_id: userId}, {$set: {lastLogin: Date.now()}}, false);
}
