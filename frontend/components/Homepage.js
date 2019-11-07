import { useQuery } from '@apollo/react-hooks';
import { MOST_RECENT_QUERY } from '../queries/Recipe';
import { LoadingBox } from './elements/LoadingBox';
import { PageError } from './elements/PageError';
import { RecipeBox } from './RecipeBox';
import { RecipeIndex } from './styles/RecipeIndex';

const Homepage = () => {
    const { data, error, loading } = useQuery(MOST_RECENT_QUERY);

    if (loading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipe',
                    Message: error
                }}
            />
        );

    return (
        <RecipeIndex>
            {data.recipes.map(recipe => (
                <RecipeBox key={recipe.id} recipe={recipe} />
            ))}
        </RecipeIndex>
    );
};

export { Homepage };
