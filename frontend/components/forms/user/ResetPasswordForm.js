import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../../queries/User';
import { RESET_PASSWORD_MUTATION } from '../../../mutations/User';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { SuccessMessage } from '../../elements/SuccessMessage';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class ResetPasswordForm extends Component {
    static propTypes = {
        resetToken: PropTypes.string
    };

    state = {
        password: '',
        confirmPassword: '',
        successMessage: null,
        error: null
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    resetPassword = async (e, resetPasswordMutation) => {
        e.preventDefault();

        if (this.validateForm()) {
            await resetPasswordMutation({
                variables: {
                    resetToken: this.props.resetToken,
                    password: this.state.password
                }
            }).catch(err => {
                this.setState({ error: err });
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
                mutation={RESET_PASSWORD_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                onCompleted={() => {
                    if (this.state.error === null) {
                        this.setState({
                            password: '',
                            confirmPassword: '',
                            successMessage: 'Password changed successfully',
                            error: null
                        });
                    }
                }}
            >
                {(resetPassword, { error, loading }) => (
                    <Form
                        data-test="form"
                        method="post"
                        onSubmit={async e => {
                            this.resetPassword(e, resetPassword);
                        }}
                    >
                        <SuccessMessage message={this.state.successMessage} />
                        <ErrorMessage error={error || this.state.error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Reset Password</h2>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="New Password"
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
                                    placeholder="Confirm New Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.saveToState}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="confirmPassword-message" />
                            </label>
                            <button type="submit">Submit{loading ? 'ting' : ''}</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { ResetPasswordForm };
