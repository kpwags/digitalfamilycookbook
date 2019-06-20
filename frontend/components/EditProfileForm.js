import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';
import { UPDATE_PROFILE_MUTATION } from '../mutations/User';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';

class EditProfileForm extends Component {
    state = {
        name: '',
        email: ''
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateProfile = async (e, updateProfileMutation) => {
        e.preventDefault();

        const id = document.getElementById('user_id').value;

        let { name, email } = this.state;

        if (name === '') {
            name = document.getElementById('name').value;
        }

        if (email === '') {
            email = document.getElementById('email').value;
        }

        await updateProfileMutation({
            variables: {
                id,
                name,
                email
            }
        });
    };

    render() {
        return (
            <Query query={CURRENT_USER_QUERY}>
                {({ data: { me } }) => {
                    return (
                        <Mutation
                            mutation={UPDATE_PROFILE_MUTATION}
                            variables={this.state}
                            refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                        >
                            {(updateUser, { error, mutationLoading }) => (
                                <Form
                                    data-test="form"
                                    method="post"
                                    onSubmit={async e => {
                                        this.updateProfile(e, updateUser);
                                    }}
                                >
                                    <ErrorMessage error={error} />
                                    <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
                                        <input type="hidden" name="id" id="user_id" defaultValue={me.id} />
                                        <label htmlFor="name">
                                            Name
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                id="name"
                                                defaultValue={me.name}
                                                onChange={this.saveToState}
                                            />
                                        </label>
                                        <label htmlFor="email">
                                            Email
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Email"
                                                required
                                                defaultValue={me.email}
                                                onChange={this.saveToState}
                                            />
                                        </label>
                                        <button type="submit">Sav{mutationLoading ? 'ing' : 'e'} Changes</button>
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

export { EditProfileForm };
