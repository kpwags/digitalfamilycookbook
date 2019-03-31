import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_MUTATION } from '../mutations/Signup';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';

class SignupForm extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
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
                            e.preventDefault();
                            await signup();
                            this.setState({
                                email: '',
                                name: '',
                                password: ''
                            });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign Up for an Account</h2>
                            <ErrorMessage error={error} />
                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
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
