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

    console.log({ props });

    const {
        data: { recipe },
        loading,
        error,
    } = useQuery(RECIPE_BY_ID_QUERY, { variables: { id } });

    const { loggedInUser } = useContext(AppContext);

    return (
        <AuthGateway redirectUrl={`/edit-recipe?id=${id}`} permissionNeeded="USER">
            {error && <PageError error={{ Title: 'Error', Message: error.message }} />}

            {loading && (
                <div>
                    <LoadingBox />
                </div>
            )}

            {!recipe && (
                <PageError
                    error={{
                        Title: 'Recipe Not Found',
                        Message: 'The recipe cannot be found.',
                    }}
                />
            )}

            {loggedInUser && (loggedInUser.permissions.includes('ADMIN') || loggedInUser.id === recipe.user.id || editMode === 'ALL') ? (
                <EditRecipeForm recipe={recipe} previousPage={returnpage} />
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
