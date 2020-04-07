import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import { TOGGLE_ADMIN_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';

const UserToggleAdmin = (props) => {
    const [error, setError] = useState(null);

    const { addToast } = useToasts();

    const [toggleAdmin] = useMutation(TOGGLE_ADMIN_MUTATION, {
        refetchQueries: [{ query: ALL_USERS_QUERY }],
        onCompleted: (data) => {
            if (data.toggleAdmin.permissions.includes('ADMIN')) {
                addToast(`${data.toggleAdmin.name} has been changed to an administrator`, { appearance: 'success' });
            } else {
                addToast(`${data.toggleAdmin.name} has been changed to a member`, { appearance: 'success' });
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

UserToggleAdmin.propTypes = {
    userId: PropTypes.string.isRequired,
    onComplete: PropTypes.func,
    onError: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { UserToggleAdmin };
