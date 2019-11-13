import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_RECIPE_MUTATION } from '../../../mutations/Recipe';
import { ADMIN_ALL_RECIPES_QUERY } from '../../../queries/Recipe';
import { ConfirmDialog } from '../../styles/ConfirmDialog';
import { ErrorAlert } from '../../elements/ErrorAlert';

class DeleteRecipe extends Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        children: PropTypes.node
    };

    state = {
        error: null
    };

    update = (cache, payload) => {
        const data = cache.readQuery({ query: ADMIN_ALL_RECIPES_QUERY });

        data.recipes = data.recipes.filter(recipe => recipe.id !== payload.data.deleteRecipe.id);

        cache.writeQuery({ query: ADMIN_ALL_RECIPES_QUERY, data });
    };

    confirmDelete = e => {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById(`confirm-recipe-delete-${this.props.id}`).style.display = 'block';
    };

    render() {
        const { id, name } = this.props;

        return (
            <Mutation mutation={DELETE_RECIPE_MUTATION} variables={{ id }} update={this.update}>
                {(deleteRecipe, { error }) => (
                    <>
                        <ErrorAlert id={`delete-recipe-error-${id}`} error={error || this.state.error} />
                        <ConfirmDialog
                            id={`confirm-recipe-delete-${id}`}
                            message={`Are you sure you want to delete ${name}?`}
                            height="130"
                            continue={async () => {
                                await deleteRecipe().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    document.getElementById('page-overlay').style.display = 'none';
                                }
                            }}
                        />
                        <button type="button" onClick={this.confirmDelete}>
                            {this.props.children}
                        </button>
                    </>
                )}
            </Mutation>
        );
    }
}

export { DeleteRecipe };
