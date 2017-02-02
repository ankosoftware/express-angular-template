import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import crypto from 'crypto';
import {ERROR_MESSAGES} from '../errors'
import {ROLES} from './UserSettings';

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: ERROR_MESSAGES.INVALID_EMAIL
    })
];

const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            validate: emailValidator,
            trim: true
        },
        name: {
            first: {
                type:String,
                trim:true
            },
            last: {
                type:String,
                trim:true
            }
        },
        role: {
            type: String,
            enum: ROLES,
            default: ROLES[0],
            required: true
        },
        hashed_password: String,
        salt: String,
        disabled: {
            type: Boolean,
            default: false
        },
        acceptCode: {
            type: String,
            unique: true
        },
        lastLogin: {
            type: Date,
            default: null
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }, {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
});

UserSchema.virtual('fullName').get(function () {
    if(!this.name || !(this.name.first && this.name.last)) {
        return this.email;
    }
    return [this.name.first, this.name.last].join(' ').trim();
});

UserSchema.virtual('isAdmin').get(function () {
    return this.role === 'admin';
});

UserSchema.virtual('password').set(function (password) {
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function () {
    return this.hashed_password;
});

UserSchema.methods = {

    validPassword: function (password) {
        return this.hashPassword(password) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Hash password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    hashPassword: function (password) {
        if (!password || !this.salt) return '';
        let salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
    },

    /**
     * Hide security sensitive fields
     *
     * @returns {*|Array|Binary|Object}
     */
    toJSON: function () {
        let obj = this.toObject();
        delete obj.hashed_password;
        delete obj.salt;
        delete obj.password;
        return obj;
    }
};

export default mongoose.model('User', UserSchema);
