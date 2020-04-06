import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { DELETE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { AppContext } from '../AppContext/AppContext';

const DeleteMeat = (props) => {
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children } = props;

    const { toggleOverlay } = useContext(AppContext);

    const updateCache = (cache, { data: result }) => {
        const meatData = cache.readQuery({ query: ALL_MEATS_QUERY });

        meatData.meats = meatData.meats.filter((meat) => meat.id !== result.deleteMeat.id);

        cache.writeQuery({ query: ALL_MEATS_QUERY, data: meatData });
    };

    const [deleteMeat, { error: deleteError }] = useMutation(DELETE_MEAT_MUTATION, {
        update: updateCache,
        onCompleted: () => {
            props.continue(error);
        },
    });

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
                    await deleteMeat({
                        variables: { id },
                    }).catch((err) => {
                        setError(err);
                    });
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

DeleteMeat.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    continue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { DeleteMeat };
