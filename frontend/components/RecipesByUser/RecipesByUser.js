import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { RECIPE_BY_USER_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipeBox } from '../RecipeBox/RecipeBox';
import { RecipeIndex } from '../RecipeIndex/RecipeIndex';

const RecipesByUser = props => {
    const { id } = props;

    const { data, error, loading } = useQuery(RECIPE_BY_USER_QUERY, { variables: { userId: id } });

    if (loading) return <LoadingBox />;
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
        <>
            {data.recipes.length > 0 && (
                <RecipeIndex>
                    {data.recipes.map(recipe => (
                        <RecipeBox key={recipe.id} recipe={recipe} />
                    ))}
                </RecipeIndex>
            )}
        </>
    );
};

RecipesByUser.propTypes = {
    id: PropTypes.string
};

export { RecipesByUser };
