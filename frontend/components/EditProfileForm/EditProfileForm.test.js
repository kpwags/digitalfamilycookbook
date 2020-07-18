import { render, waitFor, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CURRENT_USER_QUERY, SINGLE_USER_USERNAME_QUERY } from '../../queries/User';
import { UPDATE_PROFILE_MUTATION } from '../../mutations/User';
import { EditProfileForm } from './EditProfileForm';
import { TestUser } from '../../lib/TestUtilities';
import { AppContext } from '../AppContext/AppContext';

const testUser = TestUser();
const mockClient = createMockClient();
const mockClientDuplicateUsername = createMockClient();

const updateProfileHandler = jest.fn().mockResolvedValue({
    data: {
        updateUser: {
            id: testUser.id,
            name: `${testUser.name} new`,
            username: `${testUser.username}new`,
            email: testUser.email,
            bio: `${testUser.bio} updated`,
            image: testUser.image,
            largeImage: testUser.largeImage,
        },
    },
});

const currentUserQueryHandler = jest.fn().mockResolvedValue({
    data: {
        me: testUser,
    },
});

const singleUserQueryHandler = jest.fn().mockResolvedValue({
    data: {
        user: {
            id: testUser.id,
            name: testUser.name,
            username: testUser.username,
            bio: testUser.bio,
            image: testUser.image,
            largeImage: testUser.largeImage,
        },
    },
});

const duplicateSingleUserQueryHandler = jest.fn().mockResolvedValue({
    data: {
        user: {
            id: '123456',
            name: testUser.name,
            username: `${testUser.username}2`,
            bio: testUser.bio,
            image: testUser.image,
            largeImage: testUser.largeImage,
        },
    },
});

mockClient.setRequestHandler(UPDATE_PROFILE_MUTATION, updateProfileHandler);
mockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);
mockClient.setRequestHandler(SINGLE_USER_USERNAME_QUERY, singleUserQueryHandler);

mockClientDuplicateUsername.setRequestHandler(UPDATE_PROFILE_MUTATION, updateProfileHandler);
mockClientDuplicateUsername.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);
mockClientDuplicateUsername.setRequestHandler(SINGLE_USER_USERNAME_QUERY, duplicateSingleUserQueryHandler);

describe('<EditProfileForm />', () => {
    test('it renders the form', async () => {
        const { findByLabelText } = render(
            <AppContext.Provider value={{ loggedInUser: testUser }}>
                <ApolloProvider client={mockClient}>
                    <EditProfileForm />
                </ApolloProvider>
            </AppContext.Provider>
        );

        await findByLabelText(/Name/);
        await findByLabelText(/Username/);
        await findByLabelText(/Email/);
        await findByLabelText(/Bio/);
    });

    test('it updates the user profile successfully', async () => {
        const { getByLabelText, getByTestId, findByText } = render(
            <AppContext.Provider value={{ loggedInUser: testUser }}>
                <ApolloProvider client={mockClient}>
                    <EditProfileForm />
                </ApolloProvider>
            </AppContext.Provider>
        );

        await act(async () => {
            await fireEvent.change(getByLabelText(/Name/), {
                target: {
                    value: `${testUser.name} new`,
                },
            });

            await fireEvent.change(getByLabelText(/Bio/), {
                target: {
                    value: `${testUser.bio} updated`,
                },
            });

            await waitFor(async () => {
                fireEvent.change(getByLabelText(/Username/), {
                    target: {
                        value: `${testUser.username}new`,
                    },
                });

                await fireEvent.blur(getByLabelText(/Username/));
            });

            await findByText(/OK/);

            await fireEvent.click(getByTestId(/submitbutton/));
        });

        expect(updateProfileHandler).toBeCalledWith({
            id: testUser.id,
            name: `${testUser.name} new`,
            username: `${testUser.username}new`, // `${testUser.username}new`,
            email: testUser.email,
            bio: `${testUser.bio} updated`,
            image: testUser.image,
            largeImage: testUser.largeImage,
        });

        expect(currentUserQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user their username is already taken', async () => {
        const { getByLabelText, findByText } = render(
            <AppContext.Provider value={{ loggedInUser: testUser }}>
                <ApolloProvider client={mockClientDuplicateUsername}>
                    <EditProfileForm />
                </ApolloProvider>
            </AppContext.Provider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(getByLabelText(/Username/), {
                    target: {
                        value: `${testUser.username}2`,
                    },
                });

                await fireEvent.blur(getByLabelText(/Username/));
            });

            await findByText(/Username already taken/);
        });
    });

    // TODO: Add Test for Duplicate Email Check
});
