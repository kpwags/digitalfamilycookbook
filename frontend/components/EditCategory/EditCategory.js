import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { UPDATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { FormValidator } from '../../lib/FormValidator';

const EditCategory = props => {
    const [id, setId] = useState(props.id);
    const [error, setError] = useState(null);
    const [name, setName] = useState(props.name);
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        setId(props.id);
        setName(props.name);
    }, [props]);

    const [updateCategory, { loading: updateCategoryLoading, error: updateCategoryError }] = useMutation(
        UPDATE_CATEGORY_MUTATION,
        {
            refetchQueries: [{ query: ALL_CATEGORIES_QUERY }]
        }
    );

    const validate = () => {
        if (!FormValidator.validateNotEmpty(name)) {
            setNameError('Name is required');
        } else {
            setNameError('');
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

    const cancelEdit = e => {
        e.preventDefault();
        setNameError('');
        props.onDone(true, null);
    };

    return (
        <Form
            data-test="form"
            onSubmit={async e => {
                e.preventDefault();

                setError(null);

                if (validateForm()) {
                    await updateCategory({
                        variables: {
                            id,
                            name
                        }
                    }).catch(err => {
                        setError(err);
                    });

                    if (error === null) {
                        setNameError('');
                        props.onDone();
                    }
                }
            }}
        >
            <ErrorMessage error={error || updateCategoryError} />
            <fieldset disabled={updateCategoryLoading} aria-busy={updateCategoryLoading}>
                <label htmlFor="name" className={nameError !== '' ? 'errored' : ''}>
                    Name
                    <input
                        type="text"
                        id="edit-category-name"
                        name="name"
                        required
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            validate();
                        }}
                    />
                    <div className="error-text" style={nameError !== '' ? { display: 'block' } : {}}>
                        {nameError}
                    </div>
                </label>
                <button type="submit">Sav{updateCategoryLoading ? 'ing' : 'e'} Changes</button>
                <button type="button" onClick={cancelEdit}>
                    Cancel
                </button>
            </fieldset>
        </Form>
    );
};

EditCategory.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onDone: PropTypes.func
};

export { EditCategory };
