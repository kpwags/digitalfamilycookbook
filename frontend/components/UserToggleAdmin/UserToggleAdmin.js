import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { TOGGLE_ADMIN_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';

const UserToggleAdmin = props => {
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    const [toggleAdmin] = useMutation(TOGGLE_ADMIN_MUTATION, {
        refetchQueries: [{ query: ALL_USERS_QUERY }]
    });

    return (
        <>
            <button
                className="wide"
                type="button"
                data-id={props.userId}
                onClick={async e => {
                    e.preventDefault();

                    setError(null);

                    await toggleAdmin({
                        variables: {
                            id: props.userId
                        }
                    }).catch(err => {
                        // TODO: Display Error?
                        setError(err);
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
    children: PropTypes.node
};

export { UserToggleAdmin };
