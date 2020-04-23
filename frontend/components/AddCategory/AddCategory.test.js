import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CREATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddCategory } from './AddCategory';

const category = TestCategory();

const mockClient = createMockClient();

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

describe('<AddCategory/>', () => {
    test('it renders the input', async () => {
        const { findByLabelText } = render(
            <MockedThemeProvider>
                <AddCategory />
            </MockedThemeProvider>
        );

        await findByLabelText(/Name/);
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

            fireEvent.click(await getByText(/Save/));
        });

        expect(mutationHandler).toBeCalledWith({
            name: category.name,
        });

        expect(allCategoriesQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a category name is required if left blank', async () => {
        const { findByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <AddCategory />
            </ApolloProvider>
        );

        await waitFor(async () => fireEvent.blur(await getByLabelText(/Name/)));

        await findByText(/Name is required/);
    });
});
