import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION } from '../mutations/Signup';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';
import { FormValidator } from '../lib/FormValidator';
import { Utilities } from '../lib/Utilities';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: ''
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    signupUser = async (e, signupMutation) => {
        e.preventDefault();

        if (this.validateForm()) {
            const args = this.state;

            await signupMutation({
                variables: {
                    ...args,
                    image: '/static/images/user.jpg',
                    largeImage: '/static/images/user-lg.jpg'
                }
            });

            this.setState({
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                bio: ''
            });
        }
    };

    validate = e => {
        e.preventDefault();

        const { valid: passwordsValid, message } = FormValidator.validatePassword(
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
                Utilities.invalidateField('confirmPassword', message);
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

        if (!FormValidator.validateEmail(this.state.email)) {
            Utilities.invalidateField('email', 'Invalid email');
            isValid = false;
        }

        const { valid: passwordsValid, message } = FormValidator.validatePassword(
            this.state.password,
            this.state.confirmPassword
        );

        if (!passwordsValid) {
            Utilities.invalidateField('password');
            Utilities.invalidateField('confirmPassword', message);
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
                            <ErrorMessage error={error} />
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
