import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { RECIPE_BY_CATEGORY_QUERY } from '../../queries/Recipe';
import { CATEGORY_BY_ID_QUERY } from '../../queries/Category';
import { TestRecipe, TestCategory } from '../../lib/TestUtilities';
import { RecipesByCategory } from './RecipesByCategory';

const mockClient = createMockClient();
const emptyMockClient = createMockClient();

const category = TestCategory();

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

const categoryByIdQueryHandler = jest.fn().mockResolvedValue({
    data: {
        category,
    },
});

mockClient.setRequestHandler(RECIPE_BY_CATEGORY_QUERY, recipesQueryHandler);
mockClient.setRequestHandler(CATEGORY_BY_ID_QUERY, categoryByIdQueryHandler);
emptyMockClient.setRequestHandler(RECIPE_BY_CATEGORY_QUERY, emptyRecipesQueryHandler);
emptyMockClient.setRequestHandler(CATEGORY_BY_ID_QUERY, categoryByIdQueryHandler);

describe('<RecipesByCategory />', () => {
    test('it renders a message about no recipes when there are not any', async () => {
        const { findByText } = render(
            <ApolloProvider client={emptyMockClient}>
                <RecipesByCategory id="NONE" />
            </ApolloProvider>
        );

        await findByText(/No Recipes/);
    });

    test('it renders 3 recipes when there are 3 recipes for the given category', async () => {
        const { findAllByTestId } = render(
            <ApolloProvider client={mockClient}>
                <RecipesByCategory id={category.id} />
            </ApolloProvider>
        );

        const recipes = await findAllByTestId(/RecipeBox/);
        expect(recipes).toHaveLength(3);
    });
});
