import { render, waitForElement } from '@testing-library/react';
import { RECIPE_BY_STARTING_LETTER_QUERY } from '../../queries/Recipe';
import { TestRecipe, MockedThemeProvider } from '../../lib/TestUtilities';
import { RecipesByLetter } from './RecipesByLetter';

describe('<RecipesByLetter/>', () => {
    const mocks = [
        {
            request: {
                query: RECIPE_BY_STARTING_LETTER_QUERY,
                variables: {
                    letter: 'a'
                }
            },
            result: {
                data: {
                    recipes: [
                        {
                            id: 'abc123',
                            name: 'Most Delicious Recipe',
                            image: 'dog.jpg',
                            user: {
                                id: 'abc123',
                                name: 'Jake Smith'
                            }
                        }
                    ]
                }
            }
        }
    ];

    const threeMocks = [
        {
            request: {
                query: RECIPE_BY_STARTING_LETTER_QUERY,
                variables: {
                    letter: 'a'
                }
            },
            result: {
                data: {
                    recipes: [TestRecipe(), TestRecipe(), TestRecipe()]
                }
            }
        }
    ];

    const emptyMocks = [
        {
            request: {
                query: RECIPE_BY_STARTING_LETTER_QUERY,
                variables: {
                    letter: 'b'
                }
            },
            result: {
                data: {
                    recipes: []
                }
            }
        }
    ];

    test('it renders a message about no recipes when there are not any', async () => {
        const { getByText } = render(
            <MockedThemeProvider mocks={emptyMocks}>
                <RecipesByLetter letter="b" />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/No Recipes/));
    });

    test('it renders a recipe', async () => {
        const { getByText } = render(
            <MockedThemeProvider mocks={mocks}>
                <RecipesByLetter letter="a" />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Most Delicious Recipe/));
    });

    test('it renders 3 recipes when there are 3 recipes for the given letter', async () => {
        const { findAllByTestId } = render(
            <MockedThemeProvider mocks={threeMocks}>
                <RecipesByLetter letter="a" />
            </MockedThemeProvider>
        );

        const recipes = await findAllByTestId(/RecipeBox/);
        expect(recipes).toHaveLength(3);
    });
});
