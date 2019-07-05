import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import { SIGNUP_MUTATION } from '../../../mutations/Signup';
import { CURRENT_USER_QUERY, SINGLE_USER_USERNAME_QUERY } from '../../../queries/User';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class SignupForm extends Component {
    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
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

            await signupMutation({
                variables: {
                    ...args,
                    image: '/static/images/user.jpg',
                    largeImage: '/static/images/user-lg.jpg'
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
                    bio: ''
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
                                    placeholder="Name"
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
                                            placeholder="Username"
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
                                    placeholder="Email"
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
                                    placeholder="Password"
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
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.saveToState}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="confirmPassword-message" />
                            </label>
                            <label htmlFor="bio">
                                Bio
                                <textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Enter a bit about yourself"
                                    value={this.state.bio}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button type="submit">Sign Up</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { SignupForm };
