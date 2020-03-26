import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { RESET_PASSWORD_MUTATION } from '../../mutations/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { FormValidator } from '../../lib/FormValidator';

const ResetPasswordForm = props => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const [resetPassword, { loading: resetLoading, error: resetError }] = useMutation(RESET_PASSWORD_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => {
            if (error === null) {
                setPassword('');
                setPasswordError('');
                setConfirmPassword('');
                setConfirmPasswordError('');
                setSuccessMessage('Password changed successfully');
            }
        }
    });

    const validate = e => {
        const { valid: passwordsValid, message } = FormValidator.validatePassword(password, confirmPassword);

        // eslint-disable-next-line default-case
        switch (e.target.id) {
            case 'password':
            case 'confirmPassword':
                if (!passwordsValid) {
                    setPasswordError(message);
                    setConfirmPasswordError(message);
                } else {
                    setPasswordError('');
                    setConfirmPasswordError('');
                }
                break;
        }
    };

    const validateForm = () => {
        let isValid = true;

        const { valid: passwordsValid, message } = FormValidator.validatePassword(password, confirmPassword);

        if (!passwordsValid) {
            setPasswordError(message);
            setConfirmPasswordError(message);
            isValid = false;
        }

        return isValid;
    };

    return (
        <Form
            data-test="form"
            method="post"
            onSubmit={async e => {
                e.preventDefault();

                if (validateForm()) {
                    resetPassword({
                        variables: {
                            resetToken: props.resetToken,
                            password
                        }
                    }).catch(err => {
                        setError(err);
                    });
                }
            }}
        >
            <SuccessMessage message={successMessage} />
            <ErrorMessage error={error || resetError} />

            <fieldset disabled={resetLoading} aria-busy={resetLoading}>
                <h2>Reset Password</h2>

                <label htmlFor="password" className={passwordError !== '' ? 'errored' : ''}>
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            validate(e);
                        }}
                    />
                </label>

                <label htmlFor="confirmPassword" className={confirmPasswordError !== '' ? 'errored' : ''}>
                    Confirm Password
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            validate(e);
                        }}
                    />
                    <div className="error-text" style={confirmPasswordError !== '' ? { display: 'block' } : {}}>
                        {confirmPasswordError}
                    </div>
                </label>
                <button type="submit">Submit{resetLoading ? 'ting' : ''}</button>
            </fieldset>
        </Form>
    );
};

ResetPasswordForm.propTypes = {
    resetToken: PropTypes.string
};

export { ResetPasswordForm };
