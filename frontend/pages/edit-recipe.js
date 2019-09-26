import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { RECIPE_BY_ID_QUERY } from '../queries/Recipe';
import { AuthGateway } from '../components/AuthGateway';
import { EditRecipeForm } from '../components/forms/recipe/EditRecipeForm';

const EditRecipe = props => (
    <AuthGateway redirectUrl="/create-recipe">
        <Query query={RECIPE_BY_ID_QUERY} variables={{ id: props.query.id }}>
            {({ data, recipeError }) => {
                if (recipeError) return <p>Error: {recipeError.message}</p>;

                return <EditRecipeForm recipe={data.recipe} />;
            }}
        </Query>
    </AuthGateway>
);

EditRecipe.propTypes = {
    query: PropTypes.object
};

export default EditRecipe;
