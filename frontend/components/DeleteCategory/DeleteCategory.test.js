import { render, screen, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { DeleteCategory } from './DeleteCategory';
import { AppContext } from '../AppContext/AppContext';

const category = TestCategory();

const mockClient = createMockClient();

const deleteCategoryMutationHandler = jest.fn().mockResolvedValue({
    data: {
        deleteCategory: {
            id: category.id,
        },
    },
});

const allCategoriesQueryHandler = jest.fn().mockResolvedValue({
    data: {
        categories: [TestCategory(), TestCategory(), TestCategory()],
    },
});

mockClient.setRequestHandler(DELETE_CATEGORY_MUTATION, deleteCategoryMutationHandler);
mockClient.setRequestHandler(ALL_CATEGORIES_QUERY, allCategoriesQueryHandler);

describe('<DeleteCategory/>', () => {
    test('it renders the delete button', async () => {
        render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteCategory>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await screen.findByText(/Delete/);
    });

    test('it deletes a category when the delete button followed by the confirm button is clicked', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
                        Delete
                    </DeleteCategory>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(await screen.getByText(/Delete/));

            await screen.findByText(/Are you sure you want to delete/);

            await fireEvent.click(await screen.getByTestId(/confirm-delete/));
        });

        expect(deleteCategoryMutationHandler).toBeCalledWith({
            id: category.id,
        });
    });
});
