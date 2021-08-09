import { isUserExistsByEmail } from "@services/databases/userService";
import { CustomValidator } from "express-validator";

const isEmailInUse: CustomValidator = value => {
    return isUserExistsByEmail(value).then(emailInUse => {
        if (emailInUse) {
            return Promise.reject('E-mail already in use');
        };
    });
};

export {isEmailInUse};