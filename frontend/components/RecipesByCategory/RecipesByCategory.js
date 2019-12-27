import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { RECIPE_BY_CATEGORY_QUERY } from '../../queries/Recipe';
import { CATEGORY_BY_ID_QUERY } from '../../queries/Category';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipeBox } from '../RecipeBox/RecipeBox';
import { RecipeIndex } from '../RecipeIndex/RecipeIndex';
import { Pagination } from '../Pagination/Pagination';
import { perPage } from '../../config';

const RecipesByCategory = props => {
    const { id, page } = props;

    const skip = page * perPage - perPage;

    const { data: categoryData, error: categoryError, loading: categoryLoading } = useQuery(CATEGORY_BY_ID_QUERY, {
        variables: { id }
    });

    const { data, error, loading } = useQuery(RECIPE_BY_CATEGORY_QUERY, { variables: { categoryId: id, skip } });

    if (loading || categoryLoading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipes',
                    Message: error
                }}
            />
        );
    if (categoryError)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Category',
                    Message: categoryError
                }}
            />
        );

    return (
        <>
            <h1>{categoryData.category.name}</h1>

            <Pagination type="CATEGORY" id={id} page={page} title={categoryData.category.name} />

            {data.recipes.length > 0 && (
                <RecipeIndex>
                    {data.recipes.map(recipe => (
                        <RecipeBox key={recipe.id} recipe={recipe} />
                    ))}
                </RecipeIndex>
            )}

            {data.recipes.length === 0 && <p>No {categoryData.category.name} Recipes</p>}

            <Pagination type="CATEGORY" id={id} page={page} title={categoryData.category.name} />
        </>
    );
};

RecipesByCategory.propTypes = {
    id: PropTypes.string,
    page: PropTypes.number
};

export { RecipesByCategory };
