import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { SEARCH_RECIPES_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipeBox } from '../RecipeBox/RecipeBox';
import { RecipeIndex } from '../RecipeIndex/RecipeIndex';
import { Pagination } from '../Pagination/Pagination';
import { perPage } from '../../config';

const RecipeSearchResults = props => {
    const { keywords, page } = props;

    const skip = page * perPage - perPage;

    const { data, error, loading } = useQuery(SEARCH_RECIPES_QUERY, { variables: { keywords, skip } });

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
            <Pagination type="SEARCH" keywords={keywords} page={page} title={`Search Results: ${keywords}`} />

            {data.recipes.length > 0 && (
                <RecipeIndex>
                    {data.recipes.map(recipe => (
                        <RecipeBox key={recipe.id} recipe={recipe} />
                    ))}
                </RecipeIndex>
            )}

            {data.recipes.length === 0 && <p>No Recipes found for keywords {keywords}</p>}

            <Pagination type="SEARCH" keywords={keywords} page={page} title={`Search Results: ${keywords}`} />
        </>
    );
};

RecipeSearchResults.propTypes = {
    keywords: PropTypes.string,
    page: PropTypes.number
};

export { RecipeSearchResults };
