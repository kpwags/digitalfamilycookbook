import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { CREATE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY, SINGLE_INVITATION_CODE_CODE_QUERY } from '../../queries/InvitationCode';
import { FormValidator } from '../../lib/FormValidator';

const AddInvitationCode = props => {
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [codeError, setCodeError] = useState('');

    const client = useApolloClient();
    const [createInvitationCode, { loading: addLoading, error: addError }] = useMutation(
        CREATE_INVITATION_CODE_MUTATION,
        {
            refetchQueries: [{ query: ALL_INVITATION_CODES_QUERY }],
            onCompleted: data => {
                setCode('');
                setCodeError('');

                if (typeof props.onDone === 'function') {
                    props.onDone({
                        result: true,
                        message: `Invitation Code '${data.createInvitationCode.code}' has been added successfully.`
                    });
                }
            }
        }
    );

    const validate = debounce(async () => {
        const res = await client.query({
            query: SINGLE_INVITATION_CODE_CODE_QUERY,
            variables: { code }
        });

        const { valid, message } = FormValidator.validateInvitationCode(code);

        if (res.data.invitationCode !== null) {
            setCodeError('Inivation code already exists');
        } else if (!valid) {
            setCodeError(message);
        } else {
            setCodeError('');
        }
    }, 350);

    const cancelAdd = e => {
        e.preventDefault();
        setCode('');
        setCodeError('');

        if (typeof props.onDone === 'function') {
            props.onDone();
        }
    };

    const validateForm = async () => {
        let isValid = true;

        const res = await client.query({
            query: SINGLE_INVITATION_CODE_CODE_QUERY,
            variables: { code }
        });

        const { valid, message } = FormValidator.validateInvitationCode(code);

        if (res.data.invitationCode !== null) {
            setCodeError('Inivation code already exists');
            isValid = false;
        } else if (!valid) {
            setCodeError(message);
            isValid = false;
        } else {
            setCodeError('');
        }

        return isValid;
    };

    return (
        <Form
            data-test="form"
            id="create-invitation-code-form"
            onSubmit={async e => {
                e.preventDefault();

                setError(null);

                const isValid = await validateForm();
                if (isValid) {
                    await createInvitationCode({ variables: { code } }).catch(err => {
                        setError(err);
                    });
                }
            }}
        >
            <ErrorMessage error={addError || error} />
            <fieldset disabled={addLoading} aria-busy={addLoading}>
                <label htmlFor="add-invitation-code-code" className={codeError !== '' ? 'errored' : ''}>
                    Code
                    <input
                        type="text"
                        id="add-invitation-code-code"
                        name="code"
                        maxLength="20"
                        value={code}
                        onChange={e => {
                            setCode(e.target.value);
                        }}
                        onBlur={e => {
                            e.preventDefault();
                            validate();
                        }}
                    />
                    <div className="error-text" style={codeError !== '' ? { display: 'block' } : {}}>
                        {codeError}
                    </div>
                </label>
                <button type="submit">Sav{addLoading ? 'ing' : 'e'}</button>
                <button type="button" onClick={cancelAdd}>
                    Cancel
                </button>
            </fieldset>
        </Form>
    );
};

AddInvitationCode.propTypes = {
    onDone: PropTypes.func
};

export { AddInvitationCode };
