import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { SIGNUP_MUTATION } from '../../mutations/User';
import { CURRENT_USER_QUERY, SINGLE_USER_USERNAME_QUERY } from '../../queries/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FormValidator } from '../../lib/FormValidator';
import { Utilities } from '../../lib/Utilities';
import { publicRegistration } from '../../config';

class SignupForm extends Component {
    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        invitationCode: '',
        error: null
    };

    saveUsername = debounce(async (e, client) => {
        e.preventDefault();

        this.setState({ username: e.target.value });

        const res = await client.query({
            query: SINGLE_USER_USERNAME_QUERY,
            variables: { username: this.state.username }
        });

        const { valid, message } = FormValidator.validateUsername(this.state.username);

        if (res.data.user !== null) {
            Utilities.invalidateField('username', 'Username already taken');
        } else if (!valid) {
            Utilities.invalidateField('username', message);
        } else {
            Utilities.resetField('username');
        }
    }, 350);

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    signupUser = async (e, signupMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        if (this.validateForm()) {
            const args = this.state;

            if (publicRegistration) {
                args.invitationCode = 'N/A';
            }

            await signupMutation({
                variables: {
                    ...args,
                    image: '/public/images/user.jpg',
                    largeImage: '/public/images/user-lg.jpg'
                }
            }).catch(err => {
                this.setState({ error: err });
            });

            if (this.state.error === null) {
                this.setState({
                    email: '',
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    bio: '',
                    invitationCode: ''
                });

                Router.push({
                    pathname: '/'
                });
            }
        }
    };

    validate = e => {
        e.preventDefault();

        const { valid: passwordsValid, message: passwordMessage } = FormValidator.validatePassword(
            this.state.password,
            this.state.confirmPassword
        );

        // eslint-disable-next-line default-case
        switch (e.target.id) {
        case 'email':
            if (!FormValidator.validateEmail(this.state.email)) {
                Utilities.invalidateField('email', 'Invalid email');
            } else {
                Utilities.resetField('email');
            }
            break;

        case 'name':
            if (!FormValidator.validateNotEmpty(this.state.name)) {
                Utilities.invalidateField('name', 'Name is required.');
            } else {
                Utilities.resetField('name');
            }
            break;

        case 'password':
        case 'confirmPassword':
            if (!passwordsValid) {
                Utilities.invalidateField('password');
                Utilities.invalidateField('confirmPassword', passwordMessage);
            } else {
                Utilities.resetField('password');
                Utilities.resetField('confirmPassword');
            }
            break;

        case 'invitationCode':
            if (!FormValidator.validateNotEmpty(this.state.invitationCode)) {
                Utilities.invalidateField('invitationCode', 'Invitation code is required.');
            } else {
                Utilities.resetField('invitationCode');
            }
            break;
        }
    };

    validateForm = () => {
        let isValid = true;

        if (!FormValidator.validateNotEmpty(this.state.name)) {
            Utilities.invalidateField('name', 'Name is required.');
            isValid = false;
        }

        const { valid: usernameValid, message: usernameMessage } = FormValidator.validateUsername(this.state.username);
        if (!usernameValid) {
            Utilities.invalidateField('username', usernameMessage);
            isValid = false;
        }

        if (!FormValidator.validateEmail(this.state.email)) {
            Utilities.invalidateField('email', 'Invalid email');
            isValid = false;
        }

        const { valid: passwordsValid, message: passwordMessage } = FormValidator.validatePassword(
            this.state.password,
            this.state.confirmPassword
        );

        if (!passwordsValid) {
            Utilities.invalidateField('password');
            Utilities.invalidateField('confirmPassword', passwordMessage);
            isValid = false;
        }

        if (!publicRegistration && !FormValidator.validateNotEmpty(this.state.invitationCode)) {
            Utilities.invalidateField('invitationCode', 'Invitation code is required.');
            isValid = false;
        }

        return isValid;
    };

    render() {
        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup, { error, loading }) => (
                    <Form
                        data-test="form"
                        method="post"
                        onSubmit={async e => {
                            this.signupUser(e, signup);
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign Up for an Account</h2>
                            <ErrorMessage error={error || this.state.error} />
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.saveToState}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="name-message" />
                            </label>

                            <ApolloConsumer>
                                {client => (
                                    <label htmlFor="username">
                                        Username
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            maxLength="20"
                                            onChange={e => {
                                                e.persist();
                                                this.saveUsername(e, client);
                                            }}
                                        />
                                        <div className="error-text" id="username-message" />
                                    </label>
                                )}
                            </ApolloConsumer>

                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="email-message" />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="password-message" />
                            </label>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.saveToState}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="confirmPassword-message" />
                            </label>
                            <label htmlFor="bio">
                                Bio
                                <textarea id="bio" name="bio" value={this.state.bio} onChange={this.saveToState} />
                            </label>
                            {!publicRegistration && (
                                <label htmlFor="invitationCode">
                                    Invitation Code
                                    <input
                                        type="text"
                                        name="invitationCode"
                                        id="invitationCode"
                                        value={this.state.invitationCode}
                                        onChange={this.saveToState}
                                        onBlur={this.validate}
                                    />
                                    <div className="error-text" id="invitationCode-message" />
                                </label>
                            )}
                            <button type="submit">Sign Up</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { SignupForm };
