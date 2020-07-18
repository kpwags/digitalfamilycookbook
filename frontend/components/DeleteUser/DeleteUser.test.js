import { render, screen, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_USER_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';
import { TestUser } from '../../lib/TestUtilities';
import { DeleteUser } from './DeleteUser';
import { AppContext } from '../AppContext/AppContext';

const user = TestUser();

const mockClient = createMockClient();

const deleteUserMutationHandler = jest.fn().mockResolvedValue({
    data: {
        deleteUser: {
            id: user.id,
        },
    },
});

const allUsersQueryHandler = jest.fn().mockResolvedValue({
    data: {
        users: [TestUser(), TestUser(), TestUser()],
    },
});

mockClient.setRequestHandler(DELETE_USER_MUTATION, deleteUserMutationHandler);
mockClient.setRequestHandler(ALL_USERS_QUERY, allUsersQueryHandler);

describe('<DeleteUser />', () => {
    test('it renders the delete button', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteUser id={user.id} name={user.name} doUpdate={false} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteUser>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await screen.findByText(/Delete/);
    });

    test('it deletes a user when the delete button followed by the confirm button is clicked', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteUser id={user.id} name={user.name} doUpdate={false} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteUser>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(await screen.getByText(/Delete/));

            await screen.findByText(/Are you sure you want to delete/);

            await fireEvent.click(await screen.getByTestId(/confirm-delete/));
        });

        expect(deleteUserMutationHandler).toBeCalledWith({
            id: user.id,
        });
    });
});
