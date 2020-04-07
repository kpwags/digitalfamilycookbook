import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { TextInput } from '../TextInput/TextInput';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { FormValidator } from '../../lib/FormValidator';

const AddCategory = (props) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState('');

    const { addToast } = useToasts();

    const [createCategory, { loading: createCategoryLoading, error: createCategoryError }] = useMutation(CREATE_CATEGORY_MUTATION, {
        refetchQueries: [{ query: ALL_CATEGORIES_QUERY }],
        onCompleted: (data) => {
            if (error) {
                if (props.onError) {
                    props.onError(error);
                }
            } else {
                setName('');
                setNameError('');

                addToast(`${data.createCategory.name} Added Successfully`, { appearance: 'success' });

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
            id="create-category-form"
            onSubmit={async (e) => {
                e.preventDefault();

                setError(null);

                if (validateForm()) {
                    await createCategory({ variables: { name } }).catch((err) => {
                        if (props.onError) {
                            props.onError(err);
                        } else {
                            setError(err);
                        }
                    });
                }
            }}
        >
            <ErrorMessage error={error || createCategoryError} />
            <fieldset disabled={createCategoryLoading} aria-busy={createCategoryLoading}>
                <TextInput
                    name="name"
                    label="Name"
                    id="add-category-name"
                    validationRule="notempty"
                    value={name}
                    error={nameError}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <button type="submit">Sav{createCategoryLoading ? 'ing' : 'e'}</button>
                <button type="button" onClick={cancelAdd}>
                    Cancel
                </button>
            </fieldset>
        </Form>
    );
};

AddCategory.propTypes = {
    onComplete: PropTypes.func,
    onCancel: PropTypes.func,
    onError: PropTypes.func,
};

export { AddCategory };
