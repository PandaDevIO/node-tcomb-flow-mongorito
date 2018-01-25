import config from '../config/config';
import jwt from "jsonwebtoken";

class Token {
    generate(user) {
        const token = jwt.sign({ user }, config.SECRET);
        return token;
    }

    isAuthorized(token) {
        try {
            const payload = jwt.verify(token, config.SECRET);
            return Promise.resolve(payload !== null);    
        } catch (error) {
            return Promise.reject({ error });
        }
    }
}

export default new Token();