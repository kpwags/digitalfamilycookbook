import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { DELETE_USER_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { AppContext } from '../AppContext/AppContext';

const UserDelete = props => {
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children } = props;

    const updateCache = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_USERS_QUERY });

        data.users = data.users.filter(meat => meat.id !== payload.data.deleteUser.id);

        cache.writeQuery({ query: ALL_USERS_QUERY, data });
    };

    const [deleteUser, { error: deleteError }] = useMutation(DELETE_USER_MUTATION, {
        update: updateCache
    });

    const { toggleOverlay } = useContext(AppContext);

    const confirmDelete = e => {
        e.preventDefault();

        toggleOverlay();
        setConfirmOpen(!confirmOpen);
    };

    return (
        <>
            <ErrorAlert error={error || deleteError} />
            <ConfirmDialog
                open={confirmOpen}
                message={`Are you sure you want to delete ${name}?`}
                continue={async () => {
                    await deleteUser({
                        variables: { id }
                    }).catch(err => {
                        setError(err);
                    });

                    props.continue(error);
                }}
                cancel={() => {
                    setConfirmOpen(false);
                    props.cancel();
                }}
            />
            <button type="button" onClick={confirmDelete} className="delete">
                {children}
            </button>
        </>
    );
};

UserDelete.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    continue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    children: PropTypes.node
};

export { UserDelete };
