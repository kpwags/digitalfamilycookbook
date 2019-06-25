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

    static validatePassword(value1, value2) {
        if (typeof value1 !== 'string' || typeof value2 !== 'string' || (value1 === '' && value2 === '')) {
            return {
                valid: false,
                message: 'Password is required'
            };
        }

        if (value1.trim() !== value2.trim()) {
            return {
                valid: false,
                message: 'Passwords do not match'
            };
        }

        if (value1.trim().length < 8) {
            return {
                valid: false,
                message: 'Passwords must be at least 8 characters long'
            };
        }

        return {
            valid: true,
            message: ''
        };
    }
}

export { FormValidator };
