import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { DELETE_USER_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { AppContext } from '../AppContext/AppContext';

const DeleteUser = (props) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children } = props;

    const updateCache = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_USERS_QUERY });

        data.users = data.users.filter((meat) => meat.id !== payload.data.deleteUser.id);

        cache.writeQuery({ query: ALL_USERS_QUERY, data });
    };

    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        update: updateCache,
        onCompleted: () => {
            toast(`${name} deleted successfully`);

            props.onComplete();
        },
        onError: (err) => {
            props.onError(err);
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

DeleteUser.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { DeleteUser };
