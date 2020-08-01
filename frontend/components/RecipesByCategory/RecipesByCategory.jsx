import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { RECIPE_BY_CATEGORY_QUERY } from '../../queries/Recipe';
import { CATEGORY_BY_ID_QUERY } from '../../queries/Category';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { perPage } from '../../config';
import { RecipesList } from '../RecipesList/RecipesList';

const RecipesByCategory = (props) => {
    const { id, page } = props;

    const skip = page * perPage - perPage;

    const { data: categoryData, error: categoryError, loading: categoryLoading } = useQuery(CATEGORY_BY_ID_QUERY, {
        variables: { id },
    });

    const { data, error, loading } = useQuery(RECIPE_BY_CATEGORY_QUERY, { variables: { categoryId: id, skip } });

    if (loading || categoryLoading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipes',
                    Message: error,
                }}
            />
        );
    if (categoryError)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Category',
                    Message: categoryError,
                }}
            />
        );

    return (
        <>
            <RecipesList page={page} recipes={data.recipes} title={categoryData.category.name} type="CATEGORY" id={id} />
        </>
    );
};

RecipesByCategory.propTypes = {
    id: PropTypes.string,
    page: PropTypes.number,
};

export { RecipesByCategory };
