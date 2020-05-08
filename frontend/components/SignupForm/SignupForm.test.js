import { screen, render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toBeDisabled } from '@testing-library/jest-dom';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CURRENT_USER_QUERY, SINGLE_USER_USERNAME_QUERY } from '../../queries/User';
import { SIGNUP_MUTATION } from '../../mutations/User';
import { TestUser } from '../../lib/TestUtilities';
import { publicRegistration } from '../../config';
import { SignupForm } from './SignupForm';

const testUser = TestUser();
const mockClient = createMockClient();
const duplicateUserMockClient = createMockClient();

const signupHandler = jest.fn().mockResolvedValue({
    data: {
        signup: {
            id: testUser.id,
            name: testUser.name,
            username: testUser.username,
            email: testUser.email,
            bio: testUser.bio,
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
        user: null,
    },
});

const duplicateSingleUserQueryHandler = jest.fn().mockResolvedValue({
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

mockClient.setRequestHandler(SIGNUP_MUTATION, signupHandler);
mockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);
mockClient.setRequestHandler(SINGLE_USER_USERNAME_QUERY, singleUserQueryHandler);

duplicateUserMockClient.setRequestHandler(SIGNUP_MUTATION, signupHandler);
duplicateUserMockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);
duplicateUserMockClient.setRequestHandler(SINGLE_USER_USERNAME_QUERY, duplicateSingleUserQueryHandler);

// override router.push
jest.mock('next/router', () => ({ push: jest.fn() }));

describe('<SignupForm />', () => {
    test('it renders the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <SignupForm />
            </ApolloProvider>
        );

        await screen.findByLabelText(/Name/);
        await screen.findByLabelText(/Username/);
        await screen.findByLabelText(/Email/);
        await screen.findByLabelText('Password');
        await screen.findByLabelText('Re-Enter Password');
        await screen.findByLabelText(/Bio/);

        if (!publicRegistration) {
            await screen.findByLabelText(/Invitation Code/);
        }

        await screen.findByRole('button', { name: /Sign Up/ });
    });

    test('it validates the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <SignupForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Name/), '');
            fireEvent.blur(screen.getByLabelText(/Name/));

            await userEvent.type(screen.getByLabelText(/Username/), '');
            fireEvent.blur(screen.getByLabelText(/Username/));

            await userEvent.type(screen.getByLabelText(/Email/), 'thisisntoanemail');
            fireEvent.blur(screen.getByLabelText(/Email/));

            await userEvent.type(screen.getByLabelText('Password'), '');
            fireEvent.blur(screen.getByLabelText('Password'));

            await userEvent.type(screen.getByLabelText('Re-Enter Password'), '');
            fireEvent.blur(screen.getByLabelText('Re-Enter Password'));

            if (!publicRegistration) {
                await userEvent.type(screen.getByLabelText(/Invitation Code/), '');
                fireEvent.blur(screen.getByLabelText(/Invitation Code/));
            }
        });

        await screen.findByText(/Name is required/);
        await screen.findByText(/Username is required/);
        await screen.findByText(/Valid email address required/);
        await screen.findAllByText(/Password is required/);

        if (!publicRegistration) {
            await screen.findByLabelText(/Invitation code is required/);
        }
    });

    test('it validates the password', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <SignupForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByTestId(/password/), '1234');
            fireEvent.blur(screen.getByTestId(/password/));

            await userEvent.type(screen.getByTestId(/confirmPassword/), '1234');
            fireEvent.blur(screen.getByTestId(/confirmPassword/));
        });

        await screen.findAllByText(/Passwords must be at least 8 characters long/);

        await act(async () => {
            await userEvent.type(screen.getByTestId(/password/), '1234');
            fireEvent.blur(screen.getByTestId(/password/));

            await userEvent.type(screen.getByTestId(/confirmPassword/), '12345');
            fireEvent.blur(screen.getByTestId(/confirmPassword/));
        });

        await screen.findAllByText(/Passwords do not match/);
    });

    test('it checks the username is not taken', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <SignupForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByTestId(/username/), testUser.username);
            await fireEvent.blur(screen.getByTestId(/username/));
        });

        await screen.findByText('OK');
    });

    test('it alerts the user the username is taken', async () => {
        render(
            <ApolloProvider client={duplicateUserMockClient}>
                <SignupForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByTestId(/username/), testUser.username);
            await fireEvent.blur(screen.getByTestId(/username/));
        });

        await screen.findByText('Username already taken');
        expect(screen.getByRole('button', { name: /Sign Up/ })).toBeDisabled();
    });

    test('it submits the form and signs up the user', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <SignupForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Name/), testUser.name);
            await userEvent.type(screen.getByLabelText(/Username/), testUser.username);
            await userEvent.type(screen.getByLabelText(/Email/), testUser.email);
            await userEvent.type(screen.getByTestId(/password/), 'securepassword123');
            await userEvent.type(screen.getByTestId(/confirmPassword/), 'securepassword123');
            await userEvent.type(screen.getByLabelText(/Bio/), testUser.bio);

            if (!publicRegistration) {
                await userEvent.type(screen.getByLabelText(/Invitation Code/), 'welcome');
            }

            await fireEvent.click(screen.getByRole('button', { name: /Sign Up/ }));
        });

        if (publicRegistration) {
            expect(signupHandler).toBeCalledWith({
                email: testUser.email,
                username: testUser.username,
                name: testUser.name,
                password: 'securepassword123',
                bio: testUser.bio,
                invitationCode: 'N/A',
                image: 'images/user.jpg',
                largeImage: 'images/user-lg.jpg',
            });
        } else {
            expect(signupHandler).toBeCalledWith({
                email: testUser.email,
                username: testUser.username,
                name: testUser.name,
                password: 'securepassword123',
                bio: testUser.bio,
                invitationCode: 'welcome',
                image: 'images/user.jpg',
                largeImage: 'images/user-lg.jpg',
            });
        }

        expect(Router.push).toHaveBeenCalledWith({ pathname: '/' });
    });
});
