import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { UPDATE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { FormValidator } from '../../lib/FormValidator';
import { TextInput } from '../TextInput/TextInput';

const EditMeat = props => {
    const [id, setId] = useState(props.id);
    const [error, setError] = useState(null);
    const [name, setName] = useState(props.name);
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        setId(props.id);
        setName(props.name);
    }, [props]);

    const [updateMeat, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_MEAT_MUTATION, {
        refetchQueries: [{ query: ALL_MEATS_QUERY }]
    });

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
                    await updateMeat({
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
            <ErrorMessage error={error || updateError} />
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <TextInput
                    name="name"
                    label="Name"
                    id="edit-category-name"
                    validationRule="notempty"
                    value={name}
                    error={nameError}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <button type="submit">Sav{updateLoading ? 'ing' : 'e'} Changes</button>
                <button type="button" onClick={cancelEdit}>
                    Cancel
                </button>
            </fieldset>
        </Form>
    );
};

EditMeat.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onDone: PropTypes.func
};

export { EditMeat };
