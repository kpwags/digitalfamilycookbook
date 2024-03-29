import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { DELETE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { AppContext } from '../AppContext/AppContext';

const DeleteCategory = (props) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children, updateCache = true } = props;

    const { toggleOverlay } = useContext(AppContext);

    const update = (cache, { data: result }) => {
        if (updateCache) {
            const categoryData = cache.readQuery({ query: ALL_CATEGORIES_QUERY });

            categoryData.categories = categoryData.categories.filter((category) => category.id !== result.deleteCategory.id);

            cache.writeQuery({ query: ALL_CATEGORIES_QUERY, data: categoryData });
        }
    };

    const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
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
                    await deleteCategory({
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

DeleteCategory.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    updateCache: PropTypes.bool,
    children: PropTypes.node,
};

export { DeleteCategory };
