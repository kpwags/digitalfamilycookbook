import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { perPage } from '../../config';
import { RecipesList } from '../RecipesList/RecipesList';

const AllRecipes = props => {
    const { page } = props;

    const skip = page * perPage - perPage;

    const { data, error, loading } = useQuery(ALL_RECIPES_QUERY, { variables: { skip } });

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
            <RecipesList page={page} recipes={data.recipes} title="Recipes" type="ALL" />
        </>
    );
};

AllRecipes.propTypes = {
    page: PropTypes.number
};

export { AllRecipes };
