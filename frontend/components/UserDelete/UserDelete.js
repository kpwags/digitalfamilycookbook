import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import { DELETE_USER_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { AppContext } from '../AppContext/AppContext';

const UserDelete = (props) => {
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children } = props;

    const { addToast } = useToasts();

    const updateCache = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_USERS_QUERY });

        data.users = data.users.filter((meat) => meat.id !== payload.data.deleteUser.id);

        cache.writeQuery({ query: ALL_USERS_QUERY, data });
    };

    const [deleteUser, { error: deleteError }] = useMutation(DELETE_USER_MUTATION, {
        update: updateCache,
        onCompleted: () => {
            addToast('User has been deleted', { appearance: 'success' });

            if (error && typeof props.onError === 'function') {
                return props.onError(error);
            }

            return props.onComplete();
        },
        onError: (err) => {
            return props.onError(err);
        },
    });

    const { toggleOverlay } = useContext(AppContext);

    const confirmDelete = (e) => {
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
                        variables: { id },
                    }).catch((err) => {
                        props.onError(err);
                    });
                }}
                cancel={() => {
                    setConfirmOpen(false);
                    props.onCancel();
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
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { UserDelete };
