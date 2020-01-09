import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { RECIPE_BY_MEAT_QUERY } from '../../queries/Recipe';
import { MEAT_BY_ID_QUERY } from '../../queries/Meat';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipesList } from '../RecipesList/RecipesList';
import { perPage } from '../../config';

const RecipesByMeat = props => {
    const { id, page } = props;

    const skip = page * perPage - perPage;

    const { data: meatData, error: meatError, loading: meatLoading } = useQuery(MEAT_BY_ID_QUERY, {
        variables: { id }
    });

    const { data, error, loading } = useQuery(RECIPE_BY_MEAT_QUERY, { variables: { meatId: id, skip } });

    if (loading || meatLoading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipes',
                    Message: error
                }}
            />
        );
    if (meatError)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Meat',
                    Message: meatError
                }}
            />
        );

    return (
        <>
            <RecipesList page={page} recipes={data.recipes} title={meatData.meat.name} type="MEAT" id={id} />
        </>
    );
};

RecipesByMeat.propTypes = {
    id: PropTypes.string,
    page: PropTypes.number
};

export { RecipesByMeat };
