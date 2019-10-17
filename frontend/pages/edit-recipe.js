import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { editMode } from '../config';
import { RECIPE_BY_ID_QUERY } from '../queries/Recipe';
import { AuthGateway } from '../components/AuthGateway';
import { EditRecipeForm } from '../components/forms/recipe/EditRecipeForm';
import { User } from '../components/User';
import { PageError } from '../components/elements/PageError';

const EditRecipe = props => (
    <AuthGateway redirectUrl={`/edit-recipe?id=${props.query.id}`} permissionNeeded="USER">
        <User>
            {({ data: { me } }) => (
                <Query query={RECIPE_BY_ID_QUERY} variables={{ id: props.query.id }}>
                    {({ data, recipeError }) => {
                        if (recipeError) return <PageError error={{ Title: 'Error', Message: recipeError.message }} />;

                        if (!data.recipe) {
                            return (
                                <PageError
                                    error={{
                                        Title: 'Can\'t Find Recipe',
                                        Message: 'The recipe cannot be found.'
                                    }}
                                />
                            );
                        }

                        if (
                            me &&
                            (me.permissions.includes('ADMIN') || me.id === data.recipe.user.id || editMode === 'ALL')
                        ) {
                            return <EditRecipeForm recipe={data.recipe} previousPage={props.query.returnpage} />;
                        }
                        return (
                            <PageError
                                error={{
                                    Title: 'Can\'t Edit Recipe',
                                    Message: 'You do not have permission to edit this recipe.'
                                }}
                            />
                        );
                    }}
                </Query>
            )}
        </User>
    </AuthGateway>
);

EditRecipe.propTypes = {
    query: PropTypes.object
};

export default EditRecipe;
