import { screen, render, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_MEAT_MUTATION } from '../../mutations/Meat';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { TestMeat, MockedThemeProvider } from '../../lib/TestUtilities';
import { DeleteMeat } from './DeleteMeat';
import { AppContext } from '../AppContext/AppContext';

const meat = TestMeat();

const mockClient = createMockClient();

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

describe('<DeleteMeat/>', () => {
    test('it renders the delete button', async () => {
        render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteMeat id={meat.id} name={meat.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteMeat>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await screen.findByText(/Delete/);
    });

    test('it deletes a meat when the delete button followed by the confirm button is clicked', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteMeat id={meat.id} name={meat.name} onComplete={() => {}} onCancel={() => {}} onError={() => {}} updateCache={false}>
                        Delete
                    </DeleteMeat>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(await screen.getByText(/Delete/));

            await screen.findByText(/Are you sure you want to delete/);

            await fireEvent.click(await screen.findByTestId(/confirm-delete/));
        });

        expect(deleteMeatMutationHandler).toBeCalledWith({
            id: meat.id,
        });
    });
});
