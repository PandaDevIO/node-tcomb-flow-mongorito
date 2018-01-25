// @flow
require('babel-polyfill');

import mongoose, { Schema } from 'mongoose';

import Token from "../services/token";
import bcrypt from "bcrypt-nodejs";
import config from "../config/config";
import t from 'tcomb';

const SchemaUser = new Schema({
    email: String,
    password: String,
    createdAt: Date
});

const User = mongoose.model('User', SchemaUser);

export const IUser = t.struct({
    email: t.String,
    password: t.String,
}, { strict: true, name: 'IUser' });

export const IArgs = t.struct({
    email: t.maybe(t.String),
    _id: t.maybe(t.String),
}, { strict: true, name: 'IArgs' });

class _UserModel {
    getUsers(): Promise<IUser> { return User.find({}); }
    get(_id: string): Promise<IUser> { return User.find({ _id }); }
    getWhere(args: IArgs = {}): Promise<IUser> { return User.findOne(args); }

    async attemptLogin(user: IUser): Promise<String|any> {
        const retrivedUser = await this.getWhere({ email: user.email });

        if(!retrivedUser)
            return false;
        else {
            const isPasswordValid = bcrypt.compareSync(user.password, retrivedUser.password);
            const token = isPasswordValid
                ? Token.generate(retrivedUser)
                : null;
                    
            return {token, user: retrivedUser};
        }
    }

    async signup(data: IUser): any {
        const emailAlreadyExists = await this.getWhere({ email: data.email });

        if (emailAlreadyExists) {
            return { error: 'This email address is already taken.' };
        } else {
            data.password = bcrypt.hashSync(data.password, config.SECRET);
            data.createdAt = new Date();
            const _user = new User(data);
            const createdUser = await _user.save();
            const token = Token.generate(createdUser);
            
            return { user: createdUser, token };    
        }
    }
}

export const _User = new _UserModel();