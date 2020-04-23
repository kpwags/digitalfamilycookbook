import { render, waitFor, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { CHANGE_PASSWORD_MUTATION } from '../../mutations/User';
import { ChangePasswordForm } from './ChangePasswordForm';
import { TestUser, MockedThemeProvider } from '../../lib/TestUtilities';

const testUser = TestUser();
const mockClient = createMockClient();

const changePasswordHandler = jest.fn().mockResolvedValue({
    data: {
        changePassword: {
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
            bio: testUser.bio,
            image: testUser.image,
            largeImage: testUser.largeImage,
        },
    },
});

const currentUserQueryHandler = jest.fn().mockResolvedValue({
    data: {
        me: TestUser(),
    },
});

mockClient.setRequestHandler(CHANGE_PASSWORD_MUTATION, changePasswordHandler);
mockClient.setRequestHandler(CURRENT_USER_QUERY, currentUserQueryHandler);

describe('<ChangePasswordForm />', () => {
    test('it renders the form', async () => {
        const { findByLabelText } = render(
            <MockedThemeProvider>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        await findByLabelText(/Current Password/);
        await findByLabelText(/New Password/);
        await findByLabelText(/Confirm Password/);
    });

    test('it changes the password successfully', async () => {
        const { getByTestId, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <ChangePasswordForm user={testUser} />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText(/Current Password/), {
                target: {
                    value: 'thisisold123',
                },
            });

            fireEvent.change(getByLabelText(/New Password/), {
                target: {
                    value: 'thisisnew123',
                },
            });

            fireEvent.change(getByLabelText(/Confirm Password/), {
                target: {
                    value: 'thisisnew123',
                },
            });

            await waitFor(() => fireEvent.click(getByTestId(/submitbutton/)));
        });

        expect(changePasswordHandler).toBeCalledWith({
            id: testUser.id,
            currentPassword: 'thisisold123',
            password: 'thisisnew123',
        });

        expect(currentUserQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user that they need to enter their current password when leaving the current password blank', async () => {
        const { findByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <ChangePasswordForm user={testUser} />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.change(getByLabelText(/Current Password/), {
                target: {
                    value: '',
                },
            });

            fireEvent.blur(getByLabelText(/Current Password/));
        });

        await findByText(/Current password is required/);
    });

    test('it shows an error when the new passwords do not match or password is too short', async () => {
        const { findAllByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <ChangePasswordForm user={testUser} />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.change(await getByLabelText(/Current Password/), {
                target: {
                    value: 'thisisold123',
                },
            });

            fireEvent.change(await getByLabelText(/New Password/), {
                target: {
                    value: 'thisisnew123',
                },
            });

            fireEvent.change(await getByLabelText(/Confirm Password/), {
                target: {
                    value: 'thisisnew1234',
                },
            });

            fireEvent.blur(getByLabelText(/Confirm Password/));
        });

        await findAllByText(/Passwords do not match/);

        await act(async () => {
            fireEvent.change(await getByLabelText(/Current Password/), {
                target: {
                    value: 'thisisold123',
                },
            });

            fireEvent.change(await getByLabelText(/New Password/), {
                target: {
                    value: 'new',
                },
            });

            fireEvent.change(await getByLabelText(/Confirm Password/), {
                target: {
                    value: 'new',
                },
            });

            fireEvent.blur(getByLabelText(/Confirm Password/));
        });

        await findAllByText(/Passwords must be at least 8 characters long/);
    });
});
