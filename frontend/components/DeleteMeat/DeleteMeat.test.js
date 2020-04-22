import { render, waitFor, fireEvent } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { TestMeat, MockedThemeProvider } from '../../lib/TestUtilities';
import { DeleteMeat } from './DeleteMeat';
import { AppContext } from '../AppContext/AppContext';

describe('<DeleteMeat/>', () => {
    const meat = TestMeat();

    const mockClient = createMockClient();

    // Mock the result of the login mutation
    const deleteMeatMutationHandler = jest.fn().mockResolvedValue({
        data: {
            deleteMeat: {
                id: meat.id,
            },
        },
    });

    const allMeatsQueryHandler = jest.fn().mockResolvedValue({
        data: {
            categories: [TestMeat(), TestMeat(), TestMeat()],
        },
    });

    mockClient.setRequestHandler(DELETE_MEAT_MUTATION, deleteMeatMutationHandler);
    mockClient.setRequestHandler(ALL_MEATS_QUERY, allMeatsQueryHandler);

    test('it renders the delete button', async () => {
        const { findByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteMeat id={meat.id} name={meat.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteMeat>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await findByText(/Delete/);
    });

    test('it deletes a meat when the delete button followed by the confirm button is clicked', async () => {
        const { findByTestId, findByText, getByText } = render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteMeat id={meat.id} name={meat.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
                        Delete
                    </DeleteMeat>
                </AppContext.Provider>
            </ApolloProvider>
        );

        fireEvent.click(await getByText(/Delete/));

        await findByText(/Are you sure you want to delete/);

        await waitFor(async () => fireEvent.click(await findByTestId(/confirm-delete/)));

        expect(deleteMeatMutationHandler).toBeCalledWith({
            id: meat.id,
        });
    });

    // TODO: Revisit Cancelling Delete
    // test('it cancels the delete if the user clicks no on the confirmation', async () => {
    //     const { getByText, findByTestId } = render(
    //         <ApolloProvider client={mockClient}>
    //             <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
    //                 <DeleteMeat id={meat.id} name={meat.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
    //                     Delete
    //                 </DeleteMeat>
    //             </AppContext.Provider>
    //         </ApolloProvider>
    //     );

    //     await wait(async () => fireEvent.click(await getByText(/Delete/)));

    //     await waitForElement(() => findByTestId(/cancel-delete/));

    //     await wait(async () => fireEvent.click(await findByTestId(/cancel-delete/)));

    //     expect(deleteMeatMutationHandler).toBeCalledTimes(0);
    // });
});
