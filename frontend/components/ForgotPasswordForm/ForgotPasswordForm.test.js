import { screen, render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../../mutations/User';
import { TestUser } from '../../lib/TestUtilities';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const testUser = TestUser();
const mockClient = createMockClient();

const requestResetHandler = jest.fn().mockResolvedValue({
    data: {
        requestPasswordReset: {
            message: 'You have successfully request a password reset. Please check your email.',
        },
    },
});

mockClient.setRequestHandler(REQUEST_PASSWORD_RESET_MUTATION, requestResetHandler);

const noUserMockClient = createMockClient();
noUserMockClient.setRequestHandler(REQUEST_PASSWORD_RESET_MUTATION, () =>
    Promise.resolve({ errors: [{ message: `No such user found for email ${testUser.email}` }] })
);

describe('<ForgotPasswordForm />', () => {
    test('it renders the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <ForgotPasswordForm />
            </ApolloProvider>
        );

        await screen.findByLabelText(/Email/);
        await screen.findByRole('button', { name: /Request Reset/ });
    });

    test('it sends the password reset', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <ForgotPasswordForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Email/), testUser.email);
            fireEvent.click(screen.getByRole('button', { name: /Request Reset/ }));
        });

        expect(requestResetHandler).toBeCalledWith({
            email: testUser.email,
        });

        await screen.findByText(/You have successfully request a password reset. Please check your email./);
    });

    test('it alerts the user if the email does not exist', async () => {
        render(
            <ApolloProvider client={noUserMockClient}>
                <ForgotPasswordForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Email/), testUser.email);
            fireEvent.click(screen.getByRole('button', { name: /Request Reset/ }));
        });

        expect(requestResetHandler).toBeCalledWith({
            email: testUser.email,
        });

        await screen.findByText(`No such user found for email ${testUser.email}`);
    });
});
