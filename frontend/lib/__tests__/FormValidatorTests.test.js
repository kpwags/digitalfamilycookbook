import { FormValidator } from '../FormValidator';

describe('Utilities Library', () => {
    it('validateEmail()', () => {
        expect(FormValidator.validateEmail('james@test')).toEqual(false);
        expect(FormValidator.validateEmail('james@test.com')).toEqual(true);
    });

    it('validateInvitationCode()', () => {
        expect(FormValidator.validateInvitationCode('%$#@$($%#').valid).toEqual(false);
        expect(FormValidator.validateInvitationCode('samplecode').valid).toEqual(true);
        expect(FormValidator.validateInvitationCode('thisistoolongasitsgreaterthan20').valid).toEqual(false);
    });

    it('validateNotEmpty()', () => {
        expect(FormValidator.validateNotEmpty('')).toEqual(false);
        expect(FormValidator.validateNotEmpty('     ')).toEqual(false);
        expect(FormValidator.validateNotEmpty('something')).toEqual(true);
    });

    it('validateSetLength()', () => {
        expect(FormValidator.validateSetLength('hello').valid).toEqual(true);
        expect(FormValidator.validateSetLength('').valid).toEqual(false);
        expect(FormValidator.validateSetLength(' ').valid).toEqual(false);
        expect(FormValidator.validateSetLength('areallylongstring', 'field', 1, 8).valid).toEqual(false);
        expect(FormValidator.validateSetLength('notsolong', 'field', 1, 10).valid).toEqual(true);
        expect(FormValidator.validateSetLength('testing', 'field', 1, 7).valid).toEqual(true);
    });

    it('validateUsername()', () => {
        expect(FormValidator.validateUsername('%$#@$($%#').valid).toEqual(false);
        expect(FormValidator.validateUsername('samplename').valid).toEqual(true);
        expect(FormValidator.validateUsername('thisistoolongasitsgreaterthan20').valid).toEqual(false);
    });

    it('validatePassword()', () => {
        expect(FormValidator.validatePassword('password1', 'password2').valid).toEqual(false);
        expect(FormValidator.validatePassword('pass1', 'pass1').valid).toEqual(false);
        expect(FormValidator.validatePassword('password1', 'password1').valid).toEqual(true);
        expect(FormValidator.validatePassword('', '').valid).toEqual(false);
    });

    it('validateNumeric()', () => {
        expect(FormValidator.validateNumeric('123')).toEqual(true);
        expect(FormValidator.validateNumeric('123A')).toEqual(false);
        expect(FormValidator.validateNumeric(5435)).toEqual(true);
        expect(FormValidator.validateNumeric('AAA')).toEqual(false);
        expect(FormValidator.validateNumeric('one')).toEqual(false);
    });

    it('validateRequiredNumeric()', () => {
        expect(FormValidator.validateRequiredNumeric('123')).toEqual(true);
        expect(FormValidator.validateRequiredNumeric('123A')).toEqual(false);
        expect(FormValidator.validateRequiredNumeric(5435)).toEqual(true);
        expect(FormValidator.validateRequiredNumeric('')).toEqual(false);
    });
});
