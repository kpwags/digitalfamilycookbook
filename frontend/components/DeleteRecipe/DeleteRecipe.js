import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { DELETE_RECIPE_MUTATION } from '../../mutations/Recipe';
import { ADMIN_ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { AppContext } from '../AppContext/AppContext';

const DeleteRecipe = (props) => {
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, name, children } = props;

    const { toggleOverlay } = useContext(AppContext);

    const updateCache = (cache, { data: result }) => {
        const recipeData = cache.readQuery({ query: ADMIN_ALL_RECIPES_QUERY });

        recipeData.recipes = recipeData.recipes.filter((r) => r.id !== result.deleteRecipe.id);

        cache.writeQuery({ query: ADMIN_ALL_RECIPES_QUERY, data: recipeData });
    };

    const [deleteRecipe, { error: deleteError }] = useMutation(DELETE_RECIPE_MUTATION, {
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
                height="130"
                continue={async () => {
                    await deleteRecipe({
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

DeleteRecipe.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    continue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { DeleteRecipe };
