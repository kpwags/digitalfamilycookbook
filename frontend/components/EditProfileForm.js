import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';
import { UPDATE_PROFILE_MUTATION } from '../mutations/User';
import { Form } from './styles/Form';
import { ErrorMessage } from './ErrorMessage';
import { SuccessMessage } from './SuccessMessage';
import { FormValidator } from '../lib/FormValidator';
import { Utilities } from '../lib/Utilities';

class EditProfileForm extends Component {
    state = {
        name: '',
        email: '',
        bio: '',
        image: '',
        largeImage: '',
        successMessage: null
    };

    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateProfile = async (e, updateProfileMutation) => {
        e.preventDefault();

        const id = document.getElementById('user_id').value;

        let { name, email, bio, image, largeImage } = this.state;

        if (name === '') {
            name = document.getElementById('name').value;
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

        await updateProfileMutation({
            variables: {
                id,
                name,
                email,
                bio,
                image,
                largeImage
            }
        });
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

        if (!FormValidator.validateNotEmpty(name)) {
            Utilities.invalidateField('name', 'Name is required.');
        } else {
            Utilities.resetField('name');
        }

        if (!FormValidator.validateEmail(email)) {
            Utilities.invalidateField('email', 'Invalid email');
        } else {
            Utilities.resetField('email');
        }
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
                        >
                            {(updateUser, { error, mutationLoading }) => (
                                <Form
                                    data-test="form"
                                    method="post"
                                    onSubmit={async e => {
                                        this.updateProfile(e, updateUser);
                                        if (!error) {
                                            this.setState({
                                                successMessage: 'Profile updated successfully'
                                            });
                                        } else {
                                            this.setState({
                                                successMessage: null
                                            });
                                        }
                                    }}
                                >
                                    <SuccessMessage message={this.state.successMessage} />
                                    <ErrorMessage error={error} />
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
                                                required
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
