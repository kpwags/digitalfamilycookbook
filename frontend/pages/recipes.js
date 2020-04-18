import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { LoadingBox } from '../components/LoadingBox/LoadingBox';
import { PageError } from '../components/PageError/PageError';
import { ALL_RECIPES_QUERY } from '../queries/Recipe';
import { RecipesList } from '../components/RecipesList/RecipesList';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';
import { perPage } from '../config';

const Recipes = ({ query }) => {
    const page = parseInt(query.page || 1);

    const skip = page * perPage - perPage;

    const { data, error, loading } = useQuery(ALL_RECIPES_QUERY, { variables: { skip } });

    if (loading) return <LoadingBox />;

    if (error)
        return (
            <AuthGateway redirectUrl="/recipes">
                <PageError
                    error={{
                        Title: 'Error Loading Recipes',
                        Message: error,
                    }}
                />
            </AuthGateway>
        );

    return (
        <>
            <AuthGateway redirectUrl="/recipes">
                <RecipesList page={page} recipes={data.recipes} title="Recipes" type="ALL" />
            </AuthGateway>
        </>
    );
};

Recipes.propTypes = {
    query: PropTypes.object,
};

export default Recipes;
