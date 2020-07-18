import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { DELETE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { AppContext } from '../AppContext/AppContext';

const DeleteMeat = (props) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children, updateCache = true } = props;

    const { toggleOverlay } = useContext(AppContext);

    const update = (cache, { data: result }) => {
        if (updateCache) {
            const meatData = cache.readQuery({ query: ALL_MEATS_QUERY });
            meatData.meats = meatData.meats.filter((meat) => meat.id !== result.deleteMeat.id);
            cache.writeQuery({ query: ALL_MEATS_QUERY, data: meatData });
        }
    };

    const [deleteMeat] = useMutation(DELETE_MEAT_MUTATION, {
        update,
        onCompleted: () => {
            toast(`${name} deleted successfully`);
            props.onComplete();
        },
        onError: (err) => {
            props.onError(err);
        },
    });

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
                    await deleteMeat({
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

DeleteMeat.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    updateCache: PropTypes.bool,
    children: PropTypes.node,
};

export { DeleteMeat };
