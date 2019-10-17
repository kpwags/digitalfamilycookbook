import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../../mutations/User';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { SuccessMessage } from '../../elements/SuccessMessage';

class ForgotPasswordForm extends Component {
    state = {
        email: '',
        error: null
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Mutation mutation={REQUEST_PASSWORD_RESET_MUTATION} variables={this.state}>
                {(requestPasswordReset, { error, loading, called }) => (
                    <Form
                        data-test="form"
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault();
                            await requestPasswordReset();
                            this.setState({
                                email: ''
                            });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Reset Your Password</h2>
                            <ErrorMessage error={error || this.state.error} />
                            {!error && !loading && called && (
                                <SuccessMessage message="Success! Check your email for a reset link." />
                            )}
                            <label htmlFor="email">
                                Email
                                <input type="email" name="email" value={this.state.email} onChange={this.saveToState} />
                            </label>
                            <button type="submit">Request Reset</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { ForgotPasswordForm };
