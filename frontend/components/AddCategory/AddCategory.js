import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { TextInput } from '../TextInput/TextInput';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { FormValidator } from '../../lib/FormValidator';

const AddCategory = props => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [nameError, setNameError] = useState('');

    const [createCategory, { loading: createCategoryLoading, error: createCategoryError }] = useMutation(
        CREATE_CATEGORY_MUTATION,
        {
            refetchQueries: [{ query: ALL_CATEGORIES_QUERY }]
        }
    );

    const validateForm = () => {
        let isValid = true;

        if (!FormValidator.validateNotEmpty(name)) {
            setNameError('Name is required');
            isValid = false;
        }

        return isValid;
    };

    const cancelAdd = e => {
        e.preventDefault();
        setName('');
        setNameError('');

        if (typeof props.onDone === 'function') {
            props.onDone();
        }
    };

    return (
        <Form
            data-test="form"
            id="create-category-form"
            onSubmit={async e => {
                e.preventDefault();

                setError(null);

                if (validateForm()) {
                    await createCategory({ variables: { name } }).catch(err => {
                        setError(err);
                    });

                    if (error === null) {
                        setName('');
                        setNameError('');

                        if (typeof props.onDone === 'function') {
                            props.onDone();
                        }
                    }
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
                    onChange={e => {
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
    onDone: PropTypes.func
};

export { AddCategory };
