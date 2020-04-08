import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { TOGGLE_ADMIN_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';

const ToggleUserAdmin = (props) => {
    const [error, setError] = useState(null);

    const [toggleAdmin] = useMutation(TOGGLE_ADMIN_MUTATION, {
        refetchQueries: [{ query: ALL_USERS_QUERY }],
        onCompleted: (data) => {
            if (data.toggleAdmin.permissions.includes('ADMIN')) {
                toast(`${data.toggleAdmin.name} has been changed to an administrator`);
            } else {
                toast(`${data.toggleAdmin.name} has been changed to a member`);
            }

            if (error) {
                props.onError(error);
            }

            if (!error && typeof props.onComplete === 'function') {
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
                data-id={props.userId}
                onClick={async (e) => {
                    e.preventDefault();

                    setError(null);

                    await toggleAdmin({
                        variables: {
                            id: props.userId,
                        },
                    }).catch((err) => {
                        props.onError(err);
                    });
                }}
            >
                {props.children}
            </button>
        </>
    );
};

ToggleUserAdmin.propTypes = {
    userId: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
    onError: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { ToggleUserAdmin };
