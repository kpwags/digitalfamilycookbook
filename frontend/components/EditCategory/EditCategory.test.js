import { render, wait, fireEvent, waitForElement } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { UPDATE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { EditCategory } from './EditCategory';

describe('<EditCategory/>', () => {
    const category = TestCategory();
    const newCategory = TestCategory();

    const mockClient = createMockClient();

    // Mock the result of the login mutation
    const updateCategoryMutationHandler = jest.fn().mockResolvedValue({
        data: {
            updateCategory: {
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

    mockClient.setRequestHandler(UPDATE_CATEGORY_MUTATION, updateCategoryMutationHandler);
    mockClient.setRequestHandler(ALL_CATEGORIES_QUERY, allCategoriesQueryHandler);

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider>
                <EditCategory id={category.id} name={category.name} />
            </MockedThemeProvider>
        );

        const categoryNameInput = getByLabelText(/Name/);

        await waitForElement(() => getByLabelText(/Name/));

        expect(categoryNameInput.value).toBe(category.name);
    });

    test('it updates a category when the form is submited', async () => {
        const { getByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <EditCategory id={category.id} name={category.name} />
            </ApolloProvider>
        );

        fireEvent.change(await getByLabelText(/Name/), {
            target: {
                value: newCategory.name,
            },
        });

        await wait(async () => fireEvent.click(await getByText(/Save Changes/)));

        expect(updateCategoryMutationHandler).toBeCalledWith({
            id: category.id,
            name: newCategory.name,
        });

        expect(allCategoriesQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a category name is required if left blank', async () => {
        const { getByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <EditCategory id={category.id} name={category.name} />
            </ApolloProvider>
        );

        fireEvent.change(await getByLabelText(/Name/), {
            target: {
                value: '',
            },
        });

        await wait(async () => fireEvent.click(await getByText(/Save Changes/)));

        // Assert that the error message was displayed
        await waitForElement(() => getByText(/Name is required/));
    });
});
