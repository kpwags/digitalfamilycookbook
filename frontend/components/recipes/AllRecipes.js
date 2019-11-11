import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../elements/LoadingBox';
import { PageError } from '../elements/PageError';
import { RecipeBox } from './RecipeBox';
import { RecipeIndex } from '../styles/RecipeIndex';
import { perPage } from '../../config';
import { Pagination } from './Pagination';

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
            <h1>Recipes</h1>

            <Pagination type="ALL" page={page} title="Recipes" />

            <RecipeIndex>
                {data.recipes.map(recipe => (
                    <RecipeBox key={recipe.id} recipe={recipe} />
                ))}
            </RecipeIndex>

            <Pagination type="ALL" page={page} title="Recipes" />
        </>
    );
};

AllRecipes.propTypes = {
    page: PropTypes.number
};

export { AllRecipes };
