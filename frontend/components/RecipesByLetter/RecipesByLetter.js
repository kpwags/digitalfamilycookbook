import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { RECIPE_BY_STARTING_LETTER_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipesList } from '../RecipesList/RecipesList';

const RecipesByLetter = props => {
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
            {!loading && <RecipesList showTitle={false} recipes={data.recipes} />}
        </>
    );
};

RecipesByLetter.propTypes = {
    letter: PropTypes.string
};

export { RecipesByLetter };
