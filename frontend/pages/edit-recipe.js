import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { editMode } from '../config';
import { RECIPE_BY_ID_QUERY } from '../queries/Recipe';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { EditRecipeForm } from '../components/EditRecipeForm/EditRecipeForm';
import { PageError } from '../components/PageError/PageError';
import { LoadingBox } from '../components/LoadingBox/LoadingBox';
import { AppContext } from '../components/AppContext/AppContext';

const EditRecipe = (props) => {
    const { id, returnpage } = props.query;

    const { data, loading, error } = useQuery(RECIPE_BY_ID_QUERY, { variables: { id } });

    const { loggedInUser } = useContext(AppContext);

    if (loading) {
        return (
            <div>
                <LoadingBox />
            </div>
        );
    }

    if (error) {
        return <PageError error={{ Title: 'Error', Message: error.message }} />;
    }

    return (
        <AuthGateway redirectUrl={`/edit-recipe?id=${id}`} permissionNeeded="USER">
            {!data && (
                <PageError
                    error={{
                        Title: 'Recipe Not Found',
                        Message: 'The recipe cannot be found.',
                    }}
                />
            )}

            {data && loggedInUser && (loggedInUser.permissions.includes('ADMIN') || loggedInUser.id === data.recipe.user.id || editMode === 'ALL') ? (
                <EditRecipeForm recipe={data.recipe} previousPage={returnpage} />
            ) : (
                <PageError
                    error={{
                        Title: 'Insufficient Permissions',
                        Message: 'You do not have permission to edit this recipe.',
                    }}
                />
            )}
        </AuthGateway>
    );
};

EditRecipe.propTypes = {
    query: PropTypes.object,
};

export default EditRecipe;
