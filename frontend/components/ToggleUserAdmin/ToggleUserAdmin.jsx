import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { TOGGLE_ADMIN_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';

const ToggleUserAdmin = (props) => {
    let initialButtonText = 'Make Admin';
    if (props.user.permissions.includes('ADMIN')) {
        initialButtonText = 'Remove Admin';
    }

    const [error, setError] = useState(null);
    const [buttonText, setButtonText] = useState(initialButtonText);

    const [toggleAdmin] = useMutation(TOGGLE_ADMIN_MUTATION, {
        refetchQueries: [{ query: ALL_USERS_QUERY }],
        onCompleted: (data) => {
            if (data.toggleAdmin.permissions.includes('ADMIN')) {
                setButtonText('Remove Admin');
                toast(`${data.toggleAdmin.name} has been changed to an administrator`);
            } else {
                setButtonText('Make Admin');
                toast(`${data.toggleAdmin.name} has been changed to a member`);
            }

            if (error) {
                props.onError(error);
            }

            if (!error && props.onComplete) {
                props.onComplete();
            }
        },
        onError: (err) => {
            props.onError(err);
        },
    });

    return (
        <>
            <button
                className="wide"
                type="button"
                data-testid={props.user.id}
                onClick={async (e) => {
                    e.preventDefault();

                    setError(null);

                    await toggleAdmin({
                        variables: {
                            id: props.user.id,
                        },
                    }).catch((err) => {
                        props.onError(err);
                    });
                }}
            >
                {buttonText}
            </button>
        </>
    );
};

ToggleUserAdmin.propTypes = {
    user: PropTypes.object,
    onComplete: PropTypes.func,
    onError: PropTypes.func.isRequired,
};

export { ToggleUserAdmin };
