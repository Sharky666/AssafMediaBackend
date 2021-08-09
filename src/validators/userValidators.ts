import { isUserExistsByEmail } from "@services/databases/userService";
import { body, CustomValidator } from "express-validator";

const isEmailInUse: CustomValidator = value => {
    return isUserExistsByEmail(value).then(emailInUse => {
        if (emailInUse) {
            return Promise.reject('E-mail already in use');
        };
    });
};

const loginUserPropertiesValidator = [
    body('password').isLength({min: 6, max: 100}).bail(),
    body('email').isEmail().bail()
]

const userRegistryValidator = [
    body('isAdmin').isNumeric().isBoolean().bail(),
    body('password').isLength({min: 6, max: 100}).bail(),
    body('email').isEmail().bail().custom(isEmailInUse)
]

export {userRegistryValidator, loginUserPropertiesValidator};