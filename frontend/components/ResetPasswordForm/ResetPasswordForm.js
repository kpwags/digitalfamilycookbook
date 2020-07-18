import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { RESET_PASSWORD_MUTATION } from '../../mutations/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { TextInput } from '../TextInput/TextInput';
import { FormValidator } from '../../lib/FormValidator';

const ResetPasswordForm = (props) => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);
    const [enableSave, setEnableSave] = useState(true);

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
        },
    });

    const validate = (e) => {
        const { valid: passwordsValid, message } = FormValidator.validatePassword(password, confirmPassword);

        // eslint-disable-next-line default-case
        switch (e.target.id) {
            case 'password':
            case 'confirmPassword':
                if (!passwordsValid) {
                    setPasswordError(message);
                    setConfirmPasswordError(message);
                    setEnableSave(false);
                } else {
                    setPasswordError('');
                    setConfirmPasswordError('');
                    setEnableSave(true);
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
            onSubmit={async (e) => {
                e.preventDefault();

                if (validateForm()) {
                    resetPassword({
                        variables: {
                            resetToken: props.resetToken,
                            password,
                        },
                    }).catch((err) => {
                        setError(err);
                    });
                }
            }}
        >
            <SuccessMessage message={successMessage} />
            <ErrorMessage error={error || resetError} />

            <fieldset disabled={resetLoading} aria-busy={resetLoading}>
                <h2>Reset Password</h2>

                <TextInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    error={passwordError}
                    showErrorMessage={false}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    validate={(e) => {
                        e.preventDefault();
                        validate(e);
                    }}
                />

                <TextInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Re-Enter Password"
                    value={confirmPassword}
                    error={confirmPasswordError}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    validate={(e) => {
                        e.preventDefault();
                        validate(e);
                    }}
                />

                <button type="submit" disabled={!enableSave} aria-disabled={!enableSave} data-testid="submit-button">
                    Submit{resetLoading ? 'ting' : ''}
                </button>
            </fieldset>
        </Form>
    );
};

ResetPasswordForm.propTypes = {
    resetToken: PropTypes.string,
};

export { ResetPasswordForm };
