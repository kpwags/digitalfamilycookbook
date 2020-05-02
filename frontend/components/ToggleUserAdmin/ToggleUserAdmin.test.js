import { render, waitFor, act, fireEvent } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { TOGGLE_ADMIN_MUTATION } from '../../mutations/User';
import { ALL_USERS_QUERY } from '../../queries/User';
import { TestUser, TestAdmin } from '../../lib/TestUtilities';
import { ToggleUserAdmin } from './ToggleUserAdmin';

const user = TestUser();
const admin = TestAdmin();
const mockClientToAdmin = createMockClient();
const mockClientToUser = createMockClient();

const toggleToAdminMutationHandler = jest.fn().mockResolvedValue({
    data: {
        toggleAdmin: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image,
            largeImage: user.largeImage,
            permissions: ['USER', 'ADMIN'],
        },
    },
});

const toggleToUserMutationHandler = jest.fn().mockResolvedValue({
    data: {
        toggleAdmin: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            image: user.image,
            largeImage: user.largeImage,
            permissions: ['USER'],
        },
    },
});

const allQueryHandler = jest.fn().mockResolvedValue({
    data: {
        users: [TestUser(), TestUser(), TestUser()],
    },
});

mockClientToAdmin.setRequestHandler(TOGGLE_ADMIN_MUTATION, toggleToAdminMutationHandler);
mockClientToAdmin.setRequestHandler(ALL_USERS_QUERY, allQueryHandler);

mockClientToUser.setRequestHandler(TOGGLE_ADMIN_MUTATION, toggleToUserMutationHandler);
mockClientToUser.setRequestHandler(ALL_USERS_QUERY, allQueryHandler);

describe('<ToggleUserAdmin/>', () => {
    test('it renders the make admin button', async () => {
        const { findByText } = render(
            <ApolloProvider client={mockClientToAdmin}>
                <ToggleUserAdmin user={user} onError={() => {}} />
            </ApolloProvider>
        );

        await findByText(/Make Admin/);
    });

    test('it renders the remove admin button', async () => {
        const { findByText } = render(
            <ApolloProvider client={mockClientToAdmin}>
                <ToggleUserAdmin user={admin} onError={() => {}} />
            </ApolloProvider>
        );

        await findByText(/Remove Admin/);
    });

    test('it toggles a user to an admin', async () => {
        const { getByText, findByText } = render(
            <ApolloProvider client={mockClientToAdmin}>
                <ToggleUserAdmin user={user} onError={() => {}} />
            </ApolloProvider>
        );

        await act(async () => {
            await fireEvent.click(getByText(/Make Admin/));
            await findByText(/Remove Admin/);
        });

        expect(toggleToAdminMutationHandler).toBeCalledWith({
            id: user.id,
        });
    });

    test('it toggles a user to a normal user', async () => {
        const { getByText, findByText } = render(
            <ApolloProvider client={mockClientToUser}>
                <ToggleUserAdmin user={admin} onError={() => {}} />
            </ApolloProvider>
        );

        await act(async () => {
            await fireEvent.click(getByText(/Remove Admin/));
            await findByText(/Make Admin/);
        });

        expect(toggleToAdminMutationHandler).toBeCalledWith({
            id: user.id,
        });
    });
});
