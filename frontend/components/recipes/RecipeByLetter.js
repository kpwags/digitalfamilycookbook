import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { RECIPE_BY_STARTING_LETTER_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../elements/LoadingBox';
import { RecipeBox } from './RecipeBox';
import { RecipeIndex } from '../styles/RecipeIndex';
import { PageError } from '../elements/PageError';

const RecipeByLetter = props => {
    const { letter } = props;

    const { data, error, loading } = useQuery(RECIPE_BY_STARTING_LETTER_QUERY, { variables: { letter } });

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
            <h2 id={letter}>{letter.toUpperCase()}</h2>
            {loading && <LoadingBox />}
            {!loading && data.recipes.length > 0 && (
                <RecipeIndex>
                    {data.recipes.map(recipe => (
                        <RecipeBox key={recipe.id} recipe={recipe} />
                    ))}
                </RecipeIndex>
            )}
            {!loading && data.recipes.length === 0 && <p>No Recipes</p>}
        </>
    );
};

RecipeByLetter.propTypes = {
    letter: PropTypes.string
};

export { RecipeByLetter };
