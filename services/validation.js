import config from "../config/config";
import { validate } from 'tcomb-validation';

global.validateRequest = (...args) => {
    const [{content, struct}, req, res, next] = args;

    const contentValidation = validate(req[content], struct);

    contentValidation.isValid()
        ? next()
        : res.status(500).json({ content, errors: contentValidation.errors });
}