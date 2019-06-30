import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { LOGIN_MUTATION } from '../mutations/Login';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';

class LoginForm extends Component {
    static propTypes = {
        redirectUrl: PropTypes.string
    };

    state = {
        email: '',
        password: ''
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        let { redirectUrl } = this.props;

        if (typeof redirectUrl === 'undefined') {
            redirectUrl = '/';
        }

        return (
            <Mutation mutation={LOGIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(login, { error, loading }) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault();
                            await login();
                            this.setState({
                                email: '',
                                password: ''
                            });
                            Router.push({
                                pathname: redirectUrl
                            });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Log In</h2>
                            <ErrorMessage error={error} />
                            <label htmlFor="email">
                                Email or Username
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email or Username"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button type="submit">Log In</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export { LoginForm };
