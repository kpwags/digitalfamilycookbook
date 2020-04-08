import React, { useState } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import debounce from 'lodash.debounce';
import { CURRENT_USER_QUERY, SINGLE_USER_USERNAME_QUERY } from '../../queries/User';
import { UPDATE_PROFILE_MUTATION } from '../../mutations/User';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FormValidator } from '../../lib/FormValidator';
import { TextInput } from '../TextInput/TextInput';
import { TextArea } from '../TextArea/TextArea';

const EditProfileForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [largeImage, setLargeImage] = useState('');
    const [error, setError] = useState(null);
    const [saveEnabled, setSaveEnabled] = useState(true);

    const client = useApolloClient();

    const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PROFILE_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
        onCompleted: () => {
            if (!updateError) {
                toast('Profile updated successfully');
            }
        },
    });

    const {
        data: { me },
    } = useQuery(CURRENT_USER_QUERY, {
        onCompleted: (data) => {
            if (data.me !== null) {
                setId(data.me.id);
                setName(data.me.name);
                setEmail(data.me.email);
                setUsername(data.me.username);
                setBio(data.me.bio);
                setImage(data.me.image);
                setLargeImage(data.me.largeImage);
            }
        },
    });

    const uploadFile = async (e) => {
        const { files } = e.target;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'digitalfamilycookbook-avatars');

        const res = await fetch('https://api.cloudinary.com/v1_1/kpwags/image/upload', {
            method: 'POST',
            body: data,
        });

        const file = await res.json();

        setImage(file.secure_url);
        setLargeImage(file.eager[0].secure_url);
    };

    const validateUsername = debounce(async () => {
        setSaveEnabled(false);

        const resp = await client.query({
            query: SINGLE_USER_USERNAME_QUERY,
            variables: { username },
        });

        const { valid, message } = FormValidator.validateUsername(username);

        if (resp.data.user !== null && resp.data.user.id !== id) {
            setSaveEnabled(false);
            setUsernameError('Username already taken');
        } else if (!valid) {
            setSaveEnabled(false);
            setUsernameError(message);
        } else {
            setSaveEnabled(true);
            setUsernameError('');
        }
    }, 350);

    const validateForm = async () => {
        const resp = await client.query({
            query: SINGLE_USER_USERNAME_QUERY,
            variables: { username },
        });

        let isValid = true;

        const { valid: usernameValid, message: usernameMessage } = FormValidator.validateUsername(username);

        if (!FormValidator.validateEmail(email)) {
            setEmailError('Invalid email');
            isValid = false;
        }

        if (resp.data.user !== null && resp.data.user.id !== id) {
            setUsernameError('Username already taken');
        } else if (!usernameValid) {
            setUsernameError(usernameMessage);
            isValid = false;
        }

        if (!FormValidator.validateNotEmpty(name)) {
            setNameError('Name is required.');
            isValid = false;
        }

        return isValid;
    };

    return (
        <Form
            data-test="form"
            method="post"
            onSubmit={async (e) => {
                e.preventDefault();

                setError(null);

                const isValid = await validateForm();
                if (isValid) {
                    await updateUser({
                        variables: {
                            id,
                            name,
                            username,
                            email,
                            bio,
                            image,
                            largeImage,
                        },
                    }).catch((err) => {
                        setError(err);
                    });
                }
            }}
        >
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <h2>Edit Profile</h2>

                <ErrorMessage error={error || updateError} />

                <input type="hidden" name="id" id="user_id" defaultValue={me.id} />
                <input type="hidden" name="image" id="image" defaultValue={me.image} />
                <input type="hidden" name="large_image" id="large_image" defaultValue={me.largeImage} />

                <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => {
                            uploadFile(e);
                        }}
                    />
                    {image && (
                        <div className="image-preview">
                            <img src={image} alt="Upload Preview" />
                        </div>
                    )}
                    {!image && (
                        <div className="image-preview">
                            <img src={me.image} alt={me.name} />
                        </div>
                    )}
                </label>

                <TextInput
                    id="name"
                    name="name"
                    label="Name"
                    value={name}
                    validationRule="notempty"
                    error={nameError}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <TextInput
                    id="username"
                    name="username"
                    label="Username"
                    value={username}
                    error={usernameError}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    validate={(e) => {
                        e.persist();
                        validateUsername();
                    }}
                />

                <TextInput
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    error={emailError}
                    validationRule="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />

                <TextArea
                    id="bio"
                    name="bio"
                    label="Bio"
                    value={me.bio}
                    error=""
                    onChange={(e) => {
                        setBio(e.target.value);
                    }}
                />

                <button type="submit" disabled={!saveEnabled} aria-disabled={!saveEnabled}>
                    Sav{updateLoading ? 'ing' : 'e'} Changes
                </button>
            </fieldset>
        </Form>
    );
};

export { EditProfileForm };
