import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../../queries/User';
import { CHANGE_PASSWORD_MUTATION } from '../../../mutations/User';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { SuccessMessage } from '../../elements/SuccessMessage';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class ChangePasswordForm extends Component {
    state = {
        currentPassword: '',
        password: '',
        confirmPassword: '',
        successMessage: null,
        error: null
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    changePassword = async (e, changePasswordMutation) => {
        e.preventDefault();

        if (this.validateForm()) {
            const id = document.getElementById('user_id').value;

            await changePasswordMutation({
                variables: {
                    id,
                    currentPassword: this.state.currentPassword,
                    password: this.state.password
                }
            }).catch(err => {
                this.setState({ error: err });
            });

            if (this.state.error === null) {
                this.setState({
                    currentPassword: '',
                    password: '',
                    confirmPassword: '',
                    successMessage: 'Password changed successfully',
                    error: null
                });
            }
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
        case 'currentPassword':
            if (!FormValidator.validateNotEmpty(this.state.currentPassword)) {
                Utilities.invalidateField('currentPassword', 'Current password is required.');
            } else {
                Utilities.resetField('currentPassword');
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

        if (!FormValidator.validateNotEmpty(this.state.currentPassword)) {
            Utilities.invalidateField('name', 'Current password is required.');
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
            <Query query={CURRENT_USER_QUERY}>
                {({ data: { me } }) => {
                    return (
                        <Mutation
                            mutation={CHANGE_PASSWORD_MUTATION}
                            variables={this.state}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(changePassword, { error, mutationLoading }) => (
                                <Form
                                    data-test="form"
                                    method="post"
                                    onSubmit={async e => {
                                        this.changePassword(e, changePassword);
                                    }}
                                >
                                    <SuccessMessage message={this.state.successMessage} />
                                    <ErrorMessage error={error || this.state.error} />
                                    <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
                                        <h2>Change Password</h2>
                                        <input type="hidden" name="id" id="user_id" defaultValue={me.id} />
                                        <label htmlFor="currentPassword">
                                            Password
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                id="currentPassword"
                                                placeholder="Current Password"
                                                value={this.state.currentPassword}
                                                onChange={this.saveToState}
                                                onBlur={this.validate}
                                            />
                                            <div className="error-text" id="currentPassword-message" />
                                        </label>
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
                                        <button type="submit">Submit{mutationLoading ? 'ting' : ''}</button>
                                    </fieldset>
                                </Form>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export { ChangePasswordForm };
