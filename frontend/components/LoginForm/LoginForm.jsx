import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { LOGIN_MUTATION } from '../../mutations/User';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { TextInput } from '../TextInput/TextInput';

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(null);
    const [redirectUrl] = useState(props.redirectUrl);

    const [login, { loading, error: loginError }] = useMutation(LOGIN_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => {
            setUsername('');
            setUsernameError('');
            setPassword('');
            setPasswordError('');

            Router.push({
                pathname: redirectUrl,
            });
        },
    });
    return (
        <Form
            data-test="login-form"
            method="post"
            className="extra-margin"
            onSubmit={async (e) => {
                e.preventDefault();

                setError(null);

                await login({
                    variables: {
                        email: username,
                        password,
                    },
                }).catch((err) => {
                    setError(err);
                });
            }}
        >
            <fieldset disabled={loading} aria-busy={loading}>
                <h2 className="centered">Log In</h2>

                <ErrorMessage error={error || loginError} />

                <TextInput
                    id="username"
                    name="username"
                    label="Email or Username"
                    value={username}
                    error={usernameError}
                    validationRule="notempty"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />

                <TextInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    error={passwordError}
                    validationRule="notempty"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <p>
                    <Link href="/forgot-password">
                        <a>Forgot Password?</a>
                    </Link>
                </p>
                <button type="submit" data-testid="login-button">
                    {loading ? 'Logging' : 'Log'} In
                </button>
            </fieldset>
        </Form>
    );
};

LoginForm.defaultProps = {
    redirectUrl: '/',
};

LoginForm.propTypes = {
    redirectUrl: PropTypes.string,
};

export { LoginForm };
