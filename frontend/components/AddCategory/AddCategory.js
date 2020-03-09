import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
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

    const validate = (fieldId, value) => {
        // eslint-disable-next-line default-case
        switch (fieldId) {
            case 'name':
                if (!FormValidator.validateNotEmpty(value)) {
                    setNameError('Name is required');
                } else {
                    setNameError('');
                }
                break;
        }
    };

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
                <label htmlFor="add-category-name" className={nameError !== '' ? 'errored' : ''}>
                    Name
                    <input
                        type="text"
                        id="add-category-name"
                        name="name"
                        data-testid="add-category-name"
                        required
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            validate('name', name);
                        }}
                    />
                    <div className="error-text" style={nameError !== '' ? { display: 'block' } : {}}>
                        {nameError}
                    </div>
                </label>
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
