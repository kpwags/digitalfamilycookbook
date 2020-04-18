import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { DELETE_RECIPE_MUTATION } from '../../mutations/Recipe';
import { ADMIN_ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { AppContext } from '../AppContext/AppContext';

const DeleteRecipe = (props) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children, doUpdate = true } = props;

    const { toggleOverlay } = useContext(AppContext);

    const updateCache = (cache, { data: { deleteRecipe } }) => {
        if (doUpdate) {
            const { recipes } = cache.readQuery({ query: ADMIN_ALL_RECIPES_QUERY });

            const filteredRecipes = recipes.filter((r) => r.id !== deleteRecipe.id);

            cache.writeQuery({ query: ADMIN_ALL_RECIPES_QUERY, data: { recipes: filteredRecipes } });
        }
    };

    const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION, {
        update: updateCache,
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
                    setConfirmOpen(false);
                    await deleteRecipe({
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

DeleteRecipe.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    doUpdate: PropTypes.bool,
    children: PropTypes.node,
};

export { DeleteRecipe };
