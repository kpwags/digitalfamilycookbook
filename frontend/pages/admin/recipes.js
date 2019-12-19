import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Router from 'next/router';
import { ADMIN_ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { AdminGrid } from '../../components/styles/AdminGrid';
import { PageHeader } from '../../components/admin/PageHeader/PageHeader';
import { AuthGateway } from '../../components/AuthGateway';
import { LoadingBox } from '../../components/elements/LoadingBox';
import { PageError } from '../../components/elements/PageError';
import { DeleteRecipe } from '../../components/admin/DeleteRecipe/DeleteRecipe';
import { AdminLayout } from '../../components/admin/AdminLayout/AdminLayout';

class AdminRecipes extends Component {
    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/recipes" permissionNeeded="ADMIN">
                    <AdminLayout activePage="recipes">
                        <PageHeader title="Recipes" />

                        <Query query={ADMIN_ALL_RECIPES_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <div>
                                            <LoadingBox />
                                        </div>
                                    );
                                if (error)
                                    return (
                                        <PageError
                                            error={{
                                                Title: 'Error Loading Recipes',
                                                Message: error
                                            }}
                                        />
                                    );

                                return (
                                    <AdminGrid>
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
                                                    data.recipes.map(recipe => (
                                                        <tr key={recipe.id} id={`row_${recipe.id}`}>
                                                            <td>{recipe.name}</td>
                                                            <td>{recipe.user.name}</td>
                                                            <td align="center">
                                                                <button
                                                                    type="button"
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        Router.push({
                                                                            pathname: '/recipe',
                                                                            query: { id: recipe.id }
                                                                        });
                                                                    }}
                                                                >
                                                                    View
                                                                </button>
                                                            </td>
                                                            <td align="center">
                                                                <button
                                                                    type="button"
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        Router.push({
                                                                            pathname: '/edit-recipe',
                                                                            query: {
                                                                                id: recipe.id,
                                                                                returnpage: 'admin'
                                                                            }
                                                                        });
                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>
                                                            <td align="center">
                                                                <DeleteRecipe id={recipe.id} name={recipe.name}>
                                                                    Delete
                                                                </DeleteRecipe>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="no-rows">
                                                            No Recipes Defined
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </AdminGrid>
                                );
                            }}
                        </Query>
                    </AdminLayout>
                </AuthGateway>
            </>
        );
    }
}

export default AdminRecipes;
