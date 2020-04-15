import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Router from 'next/router';
import { ADMIN_ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { Grid } from '../../components/Grid/Grid';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { DeleteRecipe } from '../../components/DeleteRecipe/DeleteRecipe';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';
import { AppContext } from '../../components/AppContext/AppContext';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage/SuccessMessage';

const AdminRecipes = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const { data, error: queryError, loading } = useQuery(ADMIN_ALL_RECIPES_QUERY);

    const { toggleOverlay } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/admin/recipes" permissionNeeded="ADMIN">
                <AdminLayout activePage="recipes">
                    <AdminHeader title="Recipes" />
                    {loading && (
                        <div>
                            <LoadingBox />
                        </div>
                    )}
                    {(error || queryError) && (
                        <PageError
                            error={{
                                Title: 'Error Loading Recipes',
                                Message: error || queryError,
                            }}
                        />
                    )}

                    {!loading && (
                        <>
                            <SuccessMessage message={successMessage} />
                            <ErrorMessage message={error} />
                            <Grid>
                                <table cellPadding="0" cellSpacing="0" id="recipes_admin_grid">
                                    <thead>
                                        <tr>
                                            <th width="50%" className="no-border">
                                                Name
                                            </th>
                                            <th width="20%" className="no-border">
                                                Added By
                                            </th>
                                            <th width="10%" className="no-border">
                                                &nbsp;
                                            </th>
                                            <th width="10%" className="no-border">
                                                &nbsp;
                                            </th>
                                            <th width="10%">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.recipes.length > 0 ? (
                                            data.recipes.map((recipe) => (
                                                <tr key={recipe.id} id={`row_${recipe.id}`}>
                                                    <td>{recipe.name}</td>
                                                    <td>{recipe.user.name}</td>
                                                    <td align="center">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                Router.push({
                                                                    pathname: '/recipe',
                                                                    query: { id: recipe.id },
                                                                });
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                    <td align="center">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                Router.push({
                                                                    pathname: '/edit-recipe',
                                                                    query: {
                                                                        id: recipe.id,
                                                                        returnpage: 'admin',
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td align="center">
                                                        <DeleteRecipe
                                                            id={recipe.id}
                                                            name={recipe.name}
                                                            onComplete={() => {
                                                                toggleOverlay();
                                                            }}
                                                            onCancel={() => {
                                                                toggleOverlay();
                                                            }}
                                                            onError={(err) => {
                                                                setError(err);
                                                            }}
                                                        >
                                                            Delete
                                                        </DeleteRecipe>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="no-rows">
                                                    No Recipes Found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </Grid>
                        </>
                    )}
                </AdminLayout>
            </AuthGateway>
        </>
    );
};

export default AdminRecipes;
