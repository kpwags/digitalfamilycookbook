import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { CHANGE_PASSWORD_MUTATION } from '../../mutations/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FormValidator } from '../../lib/FormValidator';

const ChangePasswordForm = (props) => {
    const [user] = useState(props.user);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState(null);

    const [currentPasswordValidationError, setCurrentPasswordValidationError] = useState('');
    const [newPasswordValidationError, setNewPasswordValidationError] = useState('');
    const [confirmNewPasswordValidationError, setConfirmNewPasswordValidationError] = useState('');

    const [changePassword, { loading: changePasswordLoading, error: changePasswordError }] = useMutation(CHANGE_PASSWORD_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => {
            if (!error) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');

                toast('Password changed successfully');

                Router.push({
                    pathname: '/',
                });
            }
        },
        onError: (err) => {
            setError(err);
        },
    });

    const validate = (fieldId, value) => {
        const { valid: passwordsValid, message } = FormValidator.validatePassword(newPassword, confirmNewPassword);

        // eslint-disable-next-line default-case
        switch (fieldId) {
            case 'current-password':
                if (!FormValidator.validateNotEmpty(value)) {
                    setCurrentPasswordValidationError('Current password is required');
                } else {
                    setCurrentPasswordValidationError('');
                }
                break;

            case 'password':
            case 'confirm-password':
                if (!passwordsValid) {
                    setNewPasswordValidationError(message);
                    setConfirmNewPasswordValidationError(message);
                } else {
                    setNewPasswordValidationError('');
                    setConfirmNewPasswordValidationError('');
                }
                break;
        }
    };

    const validateForm = () => {
        let isValid = true;
        const { valid: passwordsValid, message } = FormValidator.validatePassword(newPassword, confirmNewPassword);

        if (!FormValidator.validateNotEmpty(currentPassword)) {
            setCurrentPasswordValidationError('Current password is required');
            isValid = false;
        }

        if (!passwordsValid) {
            setNewPasswordValidationError(message);
            setConfirmNewPasswordValidationError(message);

            isValid = false;
        }

        return isValid;
    };

    return (
        <Form
            data-test="form"
            method="post"
            onSubmit={async (e) => {
                e.preventDefault();

                setError(null);

                if (validateForm()) {
                    await changePassword({
                        variables: {
                            id: user.id,
                            currentPassword,
                            password: newPassword,
                        },
                    }).catch((err) => {
                        setError(err);
                    });
                }
            }}
        >
            <ErrorMessage error={error || changePasswordError} />
            <fieldset disabled={changePasswordLoading} aria-busy={changePasswordLoading}>
                <h2 className="centered">Change Password</h2>

                <label htmlFor="current-password" className={currentPasswordValidationError !== '' ? 'errored' : ''}>
                    Current Password
                    <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => {
                            setCurrentPassword(e.target.value);
                        }}
                        onBlur={(e) => {
                            e.preventDefault();
                            validate('current-password', currentPassword);
                        }}
                    />
                    <div className="error-text" style={currentPasswordValidationError !== '' ? { display: 'block' } : {}}>
                        {currentPasswordValidationError}
                    </div>
                </label>

                <label htmlFor="password" className={newPasswordValidationError !== '' ? 'errored' : ''}>
                    New Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                        onBlur={(e) => {
                            e.preventDefault();
                            validate('password', newPassword);
                        }}
                    />
                    <div className="error-text" style={newPasswordValidationError !== '' ? { display: 'block' } : {}}>
                        {newPasswordValidationError}
                    </div>
                </label>

                <label htmlFor="confirm-password" className={confirmNewPasswordValidationError !== '' ? 'errored' : ''}>
                    Confirm Password
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        value={confirmNewPassword}
                        onChange={(e) => {
                            setConfirmNewPassword(e.target.value);
                        }}
                        onBlur={(e) => {
                            e.preventDefault();
                            validate('confirm-password', confirmNewPassword);
                        }}
                    />
                    <div className="error-text" style={confirmNewPasswordValidationError !== '' ? { display: 'block' } : {}}>
                        {confirmNewPasswordValidationError}
                    </div>
                </label>

                <button type="submit" data-testid="submitbutton">
                    Submit{changePasswordLoading ? 'ting' : ''}
                </button>
            </fieldset>
        </Form>
    );
};

ChangePasswordForm.propTypes = {
    user: PropTypes.object,
};

export { ChangePasswordForm };
