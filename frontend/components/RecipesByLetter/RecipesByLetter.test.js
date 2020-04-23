import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { RECIPE_BY_STARTING_LETTER_QUERY } from '../../queries/Recipe';
import { TestRecipe } from '../../lib/TestUtilities';
import { RecipesByLetter } from './RecipesByLetter';

const mockClient = createMockClient();
const emptyMockClient = createMockClient();

const recipesQueryHandler = jest.fn().mockResolvedValue({
    data: {
        recipes: [TestRecipe(), TestRecipe(), TestRecipe()],
    },
});

const emptyRecipesQueryHandler = jest.fn().mockResolvedValue({
    data: {
        recipes: [],
    },
});

mockClient.setRequestHandler(RECIPE_BY_STARTING_LETTER_QUERY, recipesQueryHandler);
emptyMockClient.setRequestHandler(RECIPE_BY_STARTING_LETTER_QUERY, emptyRecipesQueryHandler);

describe('<RecipesByLetter/>', () => {
    test('it renders a message about no recipes when there are not any', async () => {
        const { findByText } = render(
            <ApolloProvider client={emptyMockClient}>
                <RecipesByLetter letter="b" />
            </ApolloProvider>
        );

        await findByText(/No Recipes/);
    });

    test('it renders 3 recipes when there are 3 recipes for the given letter', async () => {
        const { findAllByTestId } = render(
            <ApolloProvider client={mockClient}>
                <RecipesByLetter letter="b" />
            </ApolloProvider>
        );

        const recipes = await findAllByTestId(/recipelink/);
        expect(recipes).toHaveLength(3);
    });
});
