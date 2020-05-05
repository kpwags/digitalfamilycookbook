import { render, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { RESET_PASSWORD_MUTATION } from '../../mutations/User';
import { ResetPasswordForm } from './ResetPasswordForm';
import { TestUser } from '../../lib/TestUtilities';

const testUser = TestUser();
const mockClient = createMockClient();

const currentUserQueryHandler = jest.fn().mockResolvedValue({
    data: {
        me: testUser,
    },
});

const resetPasswordMutationHandler = jest.fn().mockResolvedValue({
    data: {
        resetPassword: {
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
        },
    },
});

mockClient.setRequestHandler(RESET_PASSWORD_MUTATION, resetPasswordMutationHandler);
mockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);

describe('<ResetPasswordForm/>', () => {
    test('it renders the form', async () => {
        const { findByTestId } = render(
            <ApolloProvider client={mockClient}>
                <ResetPasswordForm resetToken="1234567890" />
            </ApolloProvider>
        );

        await findByTestId(/password/);
        await findByTestId(/confirmPassword/);
    });

    test('it resets the users password', async () => {
        const { getByTestId, findByText } = render(
            <ApolloProvider client={mockClient}>
                <ResetPasswordForm resetToken="1234567890" />
            </ApolloProvider>
        );

        await act(async () => {
            await fireEvent.change(getByTestId(/password/), {
                target: {
                    value: 'securepassword123',
                },
            });

            await fireEvent.change(getByTestId(/confirmPassword/), {
                target: {
                    value: 'securepassword123',
                },
            });

            fireEvent.click(getByTestId(/submit-button/));
        });

        expect(resetPasswordMutationHandler).toBeCalledWith({
            resetToken: '1234567890',
            password: 'securepassword123',
        });

        await findByText(/Password changed successfully/);
    });

    test('it alerts the user if the password does not validate', async () => {
        const { getByTestId, findAllByText } = render(
            <ApolloProvider client={mockClient}>
                <ResetPasswordForm resetToken="1234567890" />
            </ApolloProvider>
        );

        await act(async () => {
            await fireEvent.change(getByTestId(/password/), {
                target: {
                    value: 'securepassword1234',
                },
            });

            await fireEvent.change(getByTestId(/confirmPassword/), {
                target: {
                    value: 'securepassword123',
                },
            });

            fireEvent.blur(getByTestId(/confirmPassword/));
        });

        await findAllByText(/Passwords do not match/);

        await act(async () => {
            await fireEvent.change(getByTestId(/password/), {
                target: {
                    value: '1234',
                },
            });

            await fireEvent.change(getByTestId(/confirmPassword/), {
                target: {
                    value: '1234',
                },
            });

            fireEvent.blur(getByTestId(/confirmPassword/));
        });

        await findAllByText(/Passwords must be at least 8 characters long/);
    });
});
