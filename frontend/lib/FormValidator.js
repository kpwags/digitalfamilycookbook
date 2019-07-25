import validator from 'validator';

class FormValidator {
    static validateEmail(value) {
        if (typeof value !== 'string' || !validator.isEmail(value)) {
            return false;
        }

        return true;
    }

    static validateInvitationCode(value) {
        if (!this.validateNotEmpty(value)) {
            return {
                valid: false,
                message: 'Invitation code is required'
            };
        }

        const regEx = new RegExp('^[A-Za-z0-9_]+$');
        if (!regEx.test(value)) {
            return {
                valid: false,
                message: 'Invitation codes can only contain letters, numbers, and underscores'
            };
        }

        if (value.trim().length < 1 || value.trim().length > 20) {
            return {
                valid: false,
                message: 'Invitation codes must be between 1 and 20 characters'
            };
        }

        return {
            valid: true,
            message: ''
        };
    }

    static validateNotEmpty(value) {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return false;
        }

        return true;
    }

    static validateSetLength(value, fieldName = 'value', minLength = 1, maxLength = 25) {
        if (!this.validateNotEmpty(value)) {
            return {
                valid: false,
                message: `${fieldName} is required`
            };
        }

        if (value.trim().length < minLength || value.trim().length > maxLength) {
            return {
                valid: false,
                message: `${fieldName} must be between ${minLength} and ${maxLength} characters`
            };
        }

        return {
            valid: true,
            message: ''
        };
    }

    static validateUsername(value) {
        if (!this.validateNotEmpty(value)) {
            return {
                valid: false,
                message: 'Username is required'
            };
        }

        const regEx = new RegExp('^[A-Za-z0-9_]+$');
        if (!regEx.test(value)) {
            return {
                valid: false,
                message: 'Username can only contain letters, numbers, and underscores'
            };
        }

        if (value.trim().length < 1 || value.trim().length > 20) {
            return {
                valid: false,
                message: 'Username must be between 1 and 20 characters'
            };
        }

        return {
            valid: true,
            message: ''
        };
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
