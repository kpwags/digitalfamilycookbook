import { render, waitFor, fireEvent } from '@testing-library/react';
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
        const { findByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteCategory>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await findByText(/Delete/);
    });

    test('it deletes a category when the delete button followed by the confirm button is clicked', async () => {
        const { findByTestId, findByText, getByText } = render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
                        Delete
                    </DeleteCategory>
                </AppContext.Provider>
            </ApolloProvider>
        );

        fireEvent.click(await getByText(/Delete/));

        await findByText(/Are you sure you want to delete/);

        await waitFor(async () => fireEvent.click(await findByTestId(/confirm-delete/)));

        expect(deleteCategoryMutationHandler).toBeCalledWith({
            id: category.id,
        });
    });

    // TODO: Revisit Cancelling Delete
    // test('it cancels the delete if the user clicks no on the confirmation', async () => {
    //     const { getByText, findByTestId } = render(
    //         <ApolloProvider client={mockClient}>
    //             <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
    //                 <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
    //                     Delete
    //                 </DeleteCategory>
    //             </AppContext.Provider>
    //         </ApolloProvider>
    //     );

    //     await wait(async () => fireEvent.click(await getByText(/Delete/)));

    //     await waitForElement(() => findByTestId(/cancel-delete/));

    //     await wait(async () => fireEvent.click(await findByTestId(/cancel-delete/)));

    //     expect(deleteCategoryMutationHandler).toBeCalledTimes(0);
    // });
});
