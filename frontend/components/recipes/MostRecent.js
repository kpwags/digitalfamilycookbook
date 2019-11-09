import { useQuery } from '@apollo/react-hooks';
import { MOST_RECENT_QUERY } from '../../queries/Recipe';
import { LoadingBox } from '../elements/LoadingBox';
import { PageError } from '../elements/PageError';
import { RecipeBox } from './RecipeBox';
import { RecipeIndex } from '../styles/RecipeIndex';

const MostRecent = () => {
    const { data, error, loading } = useQuery(MOST_RECENT_QUERY);

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
            <h1>Most Recent Recipes</h1>
            <RecipeIndex>
                {data.recipes.map(recipe => (
                    <RecipeBox key={recipe.id} recipe={recipe} />
                ))}
            </RecipeIndex>
        </>
    );
};

export { MostRecent };
