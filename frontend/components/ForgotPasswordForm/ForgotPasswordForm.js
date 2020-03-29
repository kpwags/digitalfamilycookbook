import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FormValidator } from '../../lib/FormValidator';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../mutations/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';
import { TextInput } from '../TextInput/TextInput';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [requestPasswordReset, { error: resetError, loading }] = useMutation(REQUEST_PASSWORD_RESET_MUTATION, {
        onCompleted: () => {
            setEmail('');
            setEmailError('');

            if (!resetError && !error) {
                setSuccessMessage('Success! Check your email for a reset link.');
            }
        }
    });

    const validateForm = () => {
        let isValid = true;

        if (FormValidator.validateEmail(email)) {
            setEmailError('');
        } else {
            setEmailError('Please enter a valid email');
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

                if (validateForm) {
                    await requestPasswordReset({
                        variables: {
                            email
                        }
                    }).catch(err => {
                        setError(err);
                    });
                }
            }}
        >
            <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Your Password</h2>
                <ErrorMessage error={error || error} />
                <SuccessMessage message={successMessage} />

                <TextInput
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    error={emailError}
                    validationRule="email"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />

                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    );
};

export { ForgotPasswordForm };
