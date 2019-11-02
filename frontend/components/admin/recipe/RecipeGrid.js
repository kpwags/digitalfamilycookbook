import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Router from 'next/router';
import { ALL_RECIPES_QUERY } from '../../../queries/Recipe';
import { AdminGrid } from '../../styles/AdminGrid';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { DeleteRecipe } from './DeleteRecipe';
import { LoadingBox } from '../../elements/LoadingBox';

class RecipeGrid extends Component {
    state = {
        error: null
    };

    render() {
        const gridStyle = {
            width: '1000px'
        };
        return (
            <>
                <ErrorMessage error={this.state.error} />

                <AdminGrid cellPadding="0" cellSpacing="0" id="useradmingrid" style={gridStyle}>
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
                        <Query query={ALL_RECIPES_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <tr>
                                            <td colSpan="3">
                                                <LoadingBox />
                                            </td>
                                        </tr>
                                    );

                                if (error)
                                    return (
                                        <tr>
                                            <td colSpan="3">Error: {error.message}</td>
                                        </tr>
                                    );

                                return data.recipes.length > 0 ? (
                                    data.recipes.map(recipe => (
                                        <tr key={recipe.id} id={recipe.id}>
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
                                                            query: { id: recipe.id, returnpage: 'admin' }
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
                                        <td colSpan="3">
                                            <em>No Recipes</em>
                                        </td>
                                    </tr>
                                );
                            }}
                        </Query>
                    </tbody>
                </AdminGrid>
            </>
        );
    }
}

export { RecipeGrid };
