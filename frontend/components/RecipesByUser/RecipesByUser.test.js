import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { RECIPE_BY_USER_QUERY } from '../../queries/Recipe';
import { TestRecipe, TestMeat } from '../../lib/TestUtilities';
import { RecipesByUser } from './RecipesByUser';

const mockClient = createMockClient();
const emptyMockClient = createMockClient();

const meat = TestMeat();

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

mockClient.setRequestHandler(RECIPE_BY_USER_QUERY, recipesQueryHandler);
emptyMockClient.setRequestHandler(RECIPE_BY_USER_QUERY, emptyRecipesQueryHandler);

describe('<RecipesByUser />', () => {
    test('it renders a message about no recipes when there are not any', async () => {
        const { findByText } = render(
            <ApolloProvider client={emptyMockClient}>
                <RecipesByUser id="NONE" />
            </ApolloProvider>
        );

        await findByText(/No Recipes/);
    });

    test('it renders 3 recipes when there are 3 recipes for the given user', async () => {
        const { findAllByTestId } = render(
            <ApolloProvider client={mockClient}>
                <RecipesByUser id={meat.id} />
            </ApolloProvider>
        );

        const recipes = await findAllByTestId(/RecipeBox/);
        expect(recipes).toHaveLength(3);
    });
});
