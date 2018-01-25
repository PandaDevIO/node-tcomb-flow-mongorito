import Mongorito, { Model } from "mongorito";

import Token from "../services/token";
import t from 'tcomb';

const IUser = t.struct({
    email: t.String,
    password: t.String,
});

const IArgs = t.struct({
    email: t.String,
    _id: t.String,
});

class User extends Model { }
class _UserModel {
    getUsers() {
        return User.find({});
    }

    get(_id: String) { return User.find({ _id }); }
    getWhere(args: IArgs) { return User.where(args).find(); }

    attemptLogin(user: IUser) {
        this.getWhere(user).then((userData) => {
            console.log(userData);
        });
    }

    attemptSignup() {

    }
}

export const _User = new _UserModel();

db.register(User);