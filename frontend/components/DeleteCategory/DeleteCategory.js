import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { DELETE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { AppContext } from '../AppContext/AppContext';

const DeleteCategory = props => {
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children } = props;

    const { toggleOverlay } = useContext(AppContext);

    const updateCache = (cache, { data: result }) => {
        const categoryData = cache.readQuery({ query: ALL_CATEGORIES_QUERY });

        categoryData.categories = categoryData.categories.filter(category => category.id !== result.deleteCategory.id);

        cache.writeQuery({ query: ALL_CATEGORIES_QUERY, data: categoryData });
    };

    const [deleteCategory, { error: deleteError }] = useMutation(DELETE_CATEGORY_MUTATION, {
        update: updateCache
    });

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
                    await deleteCategory({
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

DeleteCategory.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    continue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    children: PropTypes.node
};

export { DeleteCategory };
