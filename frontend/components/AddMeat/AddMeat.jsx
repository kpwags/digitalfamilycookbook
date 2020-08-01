import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { TextInput } from '../TextInput/TextInput';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { CREATE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { FormValidator } from '../../lib/FormValidator';

const AddMeat = (props) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState('');

    const [createMeat, { loading: createLoading, error: createError }] = useMutation(CREATE_MEAT_MUTATION, {
        refetchQueries: [{ query: ALL_MEATS_QUERY }],
        onCompleted: (data) => {
            if (error) {
                if (props.onError) {
                    props.onError(error);
                }
            } else {
                setName('');
                setNameError('');

                toast(`${data.createMeat.name} added successfully`);

                if (props.onComplete) {
                    props.onComplete();
                }
            }
        },
        onError: (err) => {
            if (props.onError) {
                props.onError(err);
            } else {
                setError(err);
            }
        },
    });

    const validateForm = () => {
        let isValid = true;

        if (!FormValidator.validateNotEmpty(name)) {
            setNameError('Name is required');
            isValid = false;
        }

        return isValid;
    };

    const cancelAdd = (e) => {
        e.preventDefault();
        setName('');
        setNameError('');

        if (props.onCancel) {
            props.onCancel();
        }
    };

    return (
        <Form
            data-test="form"
            id="create-meat-form"
            onSubmit={async (e) => {
                e.preventDefault();

                setError(null);

                if (validateForm()) {
                    await createMeat({ variables: { name } }).catch((err) => {
                        if (props.onError) {
                            props.onError(err);
                        } else {
                            setError(err);
                        }
                    });
                }
            }}
        >
            <ErrorMessage error={error || createError} />
            <fieldset disabled={createLoading} aria-busy={createLoading}>
                <TextInput
                    name="name"
                    label="Name"
                    id="add-meat-name"
                    validationRule="notempty"
                    value={name}
                    error={nameError}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <button type="submit">Sav{createLoading ? 'ing' : 'e'}</button>
                <button type="button" onClick={cancelAdd}>
                    Cancel
                </button>
            </fieldset>
        </Form>
    );
};

AddMeat.propTypes = {
    onComplete: PropTypes.func,
    onCancel: PropTypes.func,
    onError: PropTypes.func,
};

export { AddMeat };
