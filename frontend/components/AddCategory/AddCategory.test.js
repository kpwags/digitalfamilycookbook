import { render, wait, fireEvent, act, waitForElement } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddCategory } from './AddCategory';

describe('<AddCategory/>', () => {
    const category = TestCategory();

    const mockClient = createMockClient();

    // Mock the result of the login mutation
    const mutationHandler = jest.fn().mockResolvedValue({
        data: {
            createCategory: {
                id: category.id,
                name: category.name,
            },
        },
    });

    const allCategoriesQueryHandler = jest.fn().mockResolvedValue({
        data: {
            categories: [TestCategory(), TestCategory(), TestCategory()],
        },
    });

    mockClient.setRequestHandler(CREATE_CATEGORY_MUTATION, mutationHandler);
    mockClient.setRequestHandler(ALL_CATEGORIES_QUERY, allCategoriesQueryHandler);

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider>
                <AddCategory />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByLabelText(/Name/));
    });

    test('it creates a category when the form is submited', async () => {
        await act(async () => {
            const { getByText, getByLabelText } = render(
                <ApolloProvider client={mockClient}>
                    <AddCategory />
                </ApolloProvider>
            );

            fireEvent.change(await getByLabelText(/Name/), {
                target: {
                    value: category.name,
                },
            });

            await wait(async () => fireEvent.click(await getByText(/Save/)));
        });

        expect(mutationHandler).toBeCalledWith({
            name: category.name,
        });

        expect(allCategoriesQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a category name is required if left blank', async () => {
        const { getByText } = render(
            <ApolloProvider client={mockClient}>
                <AddCategory />
            </ApolloProvider>
        );

        await wait(async () => fireEvent.click(await getByText(/Save/)));

        // Assert that the error message was displayed
        await waitForElement(() => getByText(/Name is required/));
    });
});
