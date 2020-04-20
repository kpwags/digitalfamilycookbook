import { render, wait, fireEvent, waitForElement } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_CATEGORY_MUTATION } from '../../mutations/Category';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { TestCategory, MockedThemeProvider } from '../../lib/TestUtilities';
import { DeleteCategory } from './DeleteCategory';
import { AppContext } from '../AppContext/AppContext';

describe('<DeleteCategory/>', () => {
    const category = TestCategory();

    const mockClient = createMockClient();

    // Mock the result of the login mutation
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

    test('it renders the delete button', async () => {
        const { getByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteCategory>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Delete/));
    });

    test('it deletes a category when the delete button followed by the confirm button is clicked', async () => {
        const { findByTestId, getByText } = render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteCategory id={category.id} name={category.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
                        Delete
                    </DeleteCategory>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await wait(async () => fireEvent.click(await getByText(/Delete/)));

        await waitForElement(() => getByText(/Are you sure you want to delete/));

        await wait(async () => fireEvent.click(await findByTestId(/confirm-delete/)));

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
