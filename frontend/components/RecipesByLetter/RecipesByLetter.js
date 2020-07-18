import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { RECIPE_BY_STARTING_LETTER_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';
import { RecipesList } from '../RecipesList/RecipesList';

const SimpleList = styled.div`
    font-size: 1rem;

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;

        li {
            margin: 5px 0;
        }
    }
`;

const RecipesByLetter = (props) => {
    const { letter, simple = true } = props;

    const { data, error, loading } = useQuery(RECIPE_BY_STARTING_LETTER_QUERY, { variables: { letter } });

    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipes',
                    Message: error,
                }}
            />
        );

    return (
        <>
            <h2 id={letter}>{letter.toUpperCase()}</h2>

            {loading && <LoadingBox />}

            {!loading && !simple && <RecipesList showTitle={false} recipes={data.recipes} />}

            {!loading && simple && (
                <SimpleList>
                    {data.recipes.length > 0 ? (
                        <ul>
                            {data.recipes.map((recipe) => (
                                <li key={recipe.id} data-testid="recipelink">
                                    <Link href={`/recipe?id=${recipe.id}`}>
                                        <a>{recipe.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>No Recipes</div>
                    )}
                </SimpleList>
            )}
        </>
    );
};

RecipesByLetter.propTypes = {
    letter: PropTypes.string,
    simple: PropTypes.bool,
};

export { RecipesByLetter };
