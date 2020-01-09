import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { RECIPE_BY_USER_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipesList } from '../RecipesList/RecipesList';

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
            <RecipesList showTitle={false} recipes={data.recipes} />
        </>
    );
};

RecipesByUser.propTypes = {
    id: PropTypes.string
};

export { RecipesByUser };
