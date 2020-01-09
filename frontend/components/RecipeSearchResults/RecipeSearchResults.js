import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { SEARCH_RECIPES_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipesList } from '../RecipesList/RecipesList';
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
            <RecipesList
                page={page}
                recipes={data.recipes}
                keywords={keywords}
                title={`Search Results: ${keywords}`}
                type="SEARCH"
                showTitle={false}
            />
        </>
    );
};

RecipeSearchResults.propTypes = {
    keywords: PropTypes.string,
    page: PropTypes.number
};

export { RecipeSearchResults };
