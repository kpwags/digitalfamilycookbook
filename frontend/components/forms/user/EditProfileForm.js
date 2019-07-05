import React, { Component } from 'react';
import { Query, Mutation, ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { CURRENT_USER_QUERY, SINGLE_USER_USERNAME_QUERY } from '../../../queries/User';
import { UPDATE_PROFILE_MUTATION } from '../../../mutations/User';
import { Form } from '../../styles/Form';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { SuccessMessage } from '../../elements/SuccessMessage';
import { FormValidator } from '../../../lib/FormValidator';
import { Utilities } from '../../../lib/Utilities';

class EditProfileForm extends Component {
    state = {
        name: '',
        username: '',
        email: '',
        bio: '',
        image: '',
        largeImage: '',
        successMessage: null,
        error: null
    };

    saveUsername = debounce(async (e, client) => {
        e.preventDefault();

        this.setState({ username: e.target.value });

        const res = await client.query({
            query: SINGLE_USER_USERNAME_QUERY,
            variables: { username: this.state.username }
        });

        const id = document.getElementById('user_id').value;
        const { valid, message } = FormValidator.validateUsername(this.state.username);

        if (res.data.user !== null && res.data.user.id !== id) {
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

    updateProfile = async (e, updateProfileMutation) => {
        e.preventDefault();

        const id = document.getElementById('user_id').value;

        let { name, username, email, bio, image, largeImage } = this.state;

        if (name === '') {
            name = document.getElementById('name').value;
        }

        if (username === '') {
            username = document.getElementById('username').value;
        }

        if (email === '') {
            email = document.getElementById('email').value;
        }

        if (bio === '') {
            bio = document.getElementById('bio').value;
        }

        if (image === '') {
            image = document.getElementById('image').value;
        }

        if (largeImage === '') {
            largeImage = document.getElementById('large_image').value;
        }

        if (this.validateForm()) {
            await updateProfileMutation({
                variables: {
                    id,
                    name,
                    username,
                    email,
                    bio,
                    image,
                    largeImage
                }
            }).catch(err => {
                this.setState({ error: err });
            });
        }
    };

    validate = e => {
        e.preventDefault();

        let { name, email } = this.state;

        if (name === '') {
            name = document.getElementById('name').value;
        }

        if (email === '') {
            email = document.getElementById('email').value;
        }

        // eslint-disable-next-line default-case
        switch (e.target.id) {
        case 'email':
            if (!FormValidator.validateEmail(email)) {
                Utilities.invalidateField('email', 'Invalid email');
            } else {
                Utilities.resetField('email');
            }
            break;

        case 'name':
            if (!FormValidator.validateNotEmpty(name)) {
                Utilities.invalidateField('name', 'Name is required.');
            } else {
                Utilities.resetField('name');
            }
            break;
        }
    };

    validateForm = () => {
        let isValid = true;
        let { name, username, email } = this.state;

        if (name === '') {
            name = document.getElementById('name').value;
        }

        if (email === '') {
            email = document.getElementById('email').value;
        }

        if (username === '') {
            username = document.getElementById('username').value;
        }

        const { valid: usernameValid, message: usernameMessage } = FormValidator.validateUsername(username);

        if (!FormValidator.validateEmail(email)) {
            Utilities.invalidateField('email', 'Invalid email');
            isValid = false;
        }

        if (!usernameValid) {
            Utilities.invalidateField('username', usernameMessage);
            isValid = false;
        }

        if (!FormValidator.validateNotEmpty(name)) {
            Utilities.invalidateField('name', 'Name is required.');
            isValid = false;
        }

        return isValid;
    };

    uploadFile = async e => {
        const { files } = e.target;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'digitalfamilycookbook-avatars');

        const res = await fetch('https://api.cloudinary.com/v1_1/kpwags/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();

        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
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
                            onCompleted={() => {
                                if (this.state.error === null) {
                                    this.setState({
                                        successMessage: 'Profile updated successfully'
                                    });
                                }
                            }}
                        >
                            {(updateUser, { error, mutationLoading }) => (
                                <Form
                                    data-test="form"
                                    method="post"
                                    onSubmit={async e => {
                                        this.setState({ error: null, successMessage: null });
                                        this.updateProfile(e, updateUser);
                                    }}
                                >
                                    <SuccessMessage message={this.state.successMessage} />
                                    <ErrorMessage error={error || this.state.error} />
                                    <fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
                                        <h2>Edit Profile</h2>
                                        <input type="hidden" name="id" id="user_id" defaultValue={me.id} />
                                        <input type="hidden" name="image" id="image" defaultValue={me.image} />
                                        <input
                                            type="hidden"
                                            name="large_image"
                                            id="large_image"
                                            defaultValue={me.largeImage}
                                        />
                                        <label htmlFor="file">
                                            Image
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                placeholder="Upload an Image"
                                                onChange={this.uploadFile}
                                            />
                                            {this.state.image && (
                                                <div className="image-preview">
                                                    <img src={this.state.image} alt="Upload Preview" />
                                                </div>
                                            )}
                                            {!this.state.image && (
                                                <div className="image-preview">
                                                    <img src={me.image} alt={me.name} />
                                                </div>
                                            )}
                                        </label>
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
                                                        defaultValue={me.username}
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
                                                required
                                                defaultValue={me.email}
                                                onChange={this.saveToState}
                                                onBlur={this.validate}
                                            />
                                            <div className="error-text" id="email-message" />
                                        </label>
                                        <label htmlFor="bio">
                                            Bio
                                            <textarea
                                                id="bio"
                                                name="bio"
                                                placeholder="Enter a bit about yourself"
                                                defaultValue={me.bio}
                                                onChange={this.handleChange}
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
