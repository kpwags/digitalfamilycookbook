import { render, fireEvent, act } from '@testing-library/react';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { LOGIN_MUTATION } from '../../mutations/User';
import { LoginForm } from './LoginForm';
import { TestUser } from '../../lib/TestUtilities';

const testUser = TestUser();
const mockClient = createMockClient();
const invalidLoginMockClient = createMockClient();

const loginMutationHandler = jest.fn().mockResolvedValue({
    data: {
        login: {
            id: testUser.id,
            email: testUser.email,
            name: testUser.name,
            username: testUser.username,
            bio: testUser.bio,
            image: testUser.image,
            largeImage: testUser.largeImage,
            permissions: testUser.permissions,
        },
    },
});

const currentUserQueryHandler = jest.fn().mockResolvedValue({
    data: {
        me: testUser,
    },
});

mockClient.setRequestHandler(LOGIN_MUTATION, loginMutationHandler);
mockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);

// invalidLoginMockClient.setRequestHandler(LOGIN_MUTATION, () => Promise.resolve({ errors: [{ message: 'Invalid username or password' }] }));
invalidLoginMockClient.setRequestHandler(LOGIN_MUTATION, () => Promise.reject(new Error('Invalid username or password')));
invalidLoginMockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);

// override router.push
jest.mock('next/router', () => ({ push: jest.fn() }));

describe('<LoginForm />', () => {
    test('it renders the login form', async () => {
        const { findByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <LoginForm />
            </ApolloProvider>
        );

        await findByLabelText(/Email or Username/);
        await findByLabelText(/Password/);
    });

    // TODO: successful login
    test('it logs the user in', async () => {
        const { getByLabelText, getByTestId } = render(
            <ApolloProvider client={mockClient}>
                <LoginForm redirectUrl="/recipes" />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText(/Email or Username/), {
                target: {
                    value: testUser.username,
                },
            });

            fireEvent.change(getByLabelText(/Password/), {
                target: {
                    value: 'password',
                },
            });

            await fireEvent.click(getByTestId(/login-button/));
        });

        expect(Router.push).toHaveBeenCalledWith({ pathname: '/recipes' });
    });
    test('it alerts the user of an invalid login', async () => {
        const { findByText, getByLabelText, getByTestId } = render(
            <ApolloProvider client={invalidLoginMockClient}>
                <LoginForm />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText(/Email or Username/), {
                target: {
                    value: testUser.username,
                },
            });

            fireEvent.change(getByLabelText(/Password/), {
                target: {
                    value: 'password',
                },
            });

            await fireEvent.click(getByTestId(/login-button/));

            await findByText(/Invalid username or password/);
        });
    });
});
