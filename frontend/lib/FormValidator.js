import validator from 'validator';

class FormValidator {
    static validateEmail(value) {
        if (typeof value !== 'string' || !validator.isEmail(value)) {
            return false;
        }

        return true;
    }

    static validateNotEmpty(value) {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return false;
        }

        return true;
    }
}

export { FormValidator };
