import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { RECIPE_BY_MEAT_QUERY } from '../../queries/Recipe';
import { MEAT_BY_ID_QUERY } from '../../queries/Meat';
import { TestRecipe, TestMeat } from '../../lib/TestUtilities';
import { RecipesByMeat } from './RecipesByMeat';

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

const meatByIdQueryHandler = jest.fn().mockResolvedValue({
    data: {
        meat,
    },
});

mockClient.setRequestHandler(RECIPE_BY_MEAT_QUERY, recipesQueryHandler);
mockClient.setRequestHandler(MEAT_BY_ID_QUERY, meatByIdQueryHandler);
emptyMockClient.setRequestHandler(RECIPE_BY_MEAT_QUERY, emptyRecipesQueryHandler);
emptyMockClient.setRequestHandler(MEAT_BY_ID_QUERY, meatByIdQueryHandler);

describe('<ReciepsByMeat />', () => {
    test('it renders a message about no recipes when there are not any', async () => {
        const { findByText } = render(
            <ApolloProvider client={emptyMockClient}>
                <RecipesByMeat id="NONE" />
            </ApolloProvider>
        );

        await findByText(/No Recipes/);
    });

    test('it renders 3 recipes when there are 3 recipes for the given meat', async () => {
        const { findAllByTestId } = render(
            <ApolloProvider client={mockClient}>
                <RecipesByMeat id={meat.id} />
            </ApolloProvider>
        );

        const recipes = await findAllByTestId(/RecipeBox/);
        expect(recipes).toHaveLength(3);
    });
});
