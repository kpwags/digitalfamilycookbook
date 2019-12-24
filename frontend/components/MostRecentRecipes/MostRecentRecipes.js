import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { MOST_RECENT_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipeBox } from '../RecipeBox/RecipeBox';
import { RecipeIndex } from '../RecipeIndex/RecipeIndex';
import { perPage } from '../../config';
import { Pagination } from '../Pagination/Pagination';

const MostRecentRecipes = props => {
    const { page } = props;

    const skip = page * perPage - perPage;

    const { data, error, loading } = useQuery(MOST_RECENT_QUERY, { variables: { skip } });

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
            <h1>Most Recent Recipes</h1>

            <Pagination type="MOSTRECENT" page={page} />

            <RecipeIndex>
                {data.recipes.map(recipe => (
                    <RecipeBox key={recipe.id} recipe={recipe} />
                ))}
            </RecipeIndex>

            <Pagination type="MOSTRECENT" page={page} />
        </>
    );
};

MostRecentRecipes.propTypes = {
    page: PropTypes.number
};

export { MostRecentRecipes };
