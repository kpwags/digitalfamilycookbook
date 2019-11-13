import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { RECIPE_BY_MEAT_QUERY } from '../../queries/Recipe';
import { MEAT_BY_ID_QUERY } from '../../queries/Meat';
import { LoadingBox } from '../elements/LoadingBox';
import { PageError } from '../elements/PageError';
import { RecipeBox } from './RecipeBox';
import { RecipeIndex } from '../styles/RecipeIndex';
import { Pagination } from './Pagination';
import { perPage } from '../../config';

const Meat = props => {
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
            <h1>{meatData.meat.name}</h1>

            <Pagination type="MEAT" id={id} page={page} title={meatData.meat.name} />

            {data.recipes.length > 0 && (
                <RecipeIndex>
                    {data.recipes.map(recipe => (
                        <RecipeBox key={recipe.id} recipe={recipe} />
                    ))}
                </RecipeIndex>
            )}

            {data.recipes.length === 0 && <p>No {meatData.meat.name} Recipes</p>}

            <Pagination type="MEAT" id={id} page={page} title={meatData.meat.name} />
        </>
    );
};

Meat.propTypes = {
    id: PropTypes.string,
    page: PropTypes.number
};

export { Meat };
