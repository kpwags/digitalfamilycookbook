import { render, waitForElement, fireEvent } from '@testing-library/react';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { CHANGE_PASSWORD_MUTATION } from '../../mutations/User';
import { ChangePasswordForm } from './ChangePasswordForm';
import { TestUser, MockedThemeProvider } from '../../lib/TestUtilities';

const testUser = TestUser();
const mocks = [
    {
        request: {
            query: CURRENT_USER_QUERY
        },
        result: {
            data: {
                me: TestUser()
            }
        }
    },
    {
        request: {
            query: CHANGE_PASSWORD_MUTATION,
            variables: {
                id: testUser.id,
                currentPassword: 'ThisIsInsecure123',
                password: 'ThisIsTooInsecure1234'
            }
        },
        passwordChanged: jest.fn(() => ({
            data: {
                changePassword: {
                    id: testUser.id,
                    name: testUser.name,
                    email: testUser.email,
                    bio: testUser.bio,
                    image: testUser.image,
                    largeImage: testUser.largeImage
                }
            }
        }))
    }
];

describe('<ChangePasswordForm />', () => {
    test('it renders the form', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByLabelText(/Current Password/));
        await waitForElement(() => getByLabelText(/New Password/));
        await waitForElement(() => getByLabelText(/Confirm Password/));
    });

    test('it captures the input of the form', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        const currentPasswordInput = getByLabelText(/Current Password/);
        const newPasswordInput = getByLabelText(/New Password/);
        const confirmPasswordInput = getByLabelText(/Confirm Password/);

        fireEvent.change(currentPasswordInput, { target: { value: 'ThisIsAnInsecurePassword' } });
        fireEvent.change(newPasswordInput, { target: { value: 'ThisIsAlsoAnInsecurePassword' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'ThisIsAlsoAnInsecurePassword' } });

        expect(currentPasswordInput.value).toBe('ThisIsAnInsecurePassword');
        expect(newPasswordInput.value).toBe('ThisIsAlsoAnInsecurePassword');
        expect(confirmPasswordInput.value).toBe('ThisIsAlsoAnInsecurePassword');
    });

    test('it alerts the user that they need to enter their current password when leaving the current password blank', () => {
        const { getByText, getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        const currentPasswordInput = getByLabelText(/Current Password/);

        fireEvent.change(currentPasswordInput, { target: { value: '' } });

        fireEvent.blur(currentPasswordInput);

        const currentPasswordLabel = getByText(/Current Password/);

        const currentPasswordErrored = currentPasswordLabel.classList.contains('errored');

        expect(currentPasswordErrored).toBe(true);
    });

    test('it shows an error when the new passwords do not match after leaving the confirm field', () => {
        const { getByText, getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        const newPasswordInput = getByLabelText(/New Password/);
        const confirmPasswordInput = getByLabelText(/Confirm Password/);

        fireEvent.change(newPasswordInput, { target: { value: 'ThisIsAlsoAnInsecurePassword1' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'ThisIsAlsoAnInsecurePassword2' } });

        fireEvent.blur(confirmPasswordInput);

        const newPasswordLabel = getByText(/New Password/);
        const confirmPasswordLabel = getByText(/Confirm Password/);

        const newPasswordErrored = newPasswordLabel.classList.contains('errored');
        const confirmPasswordErrored = confirmPasswordLabel.classList.contains('errored');

        expect(newPasswordErrored).toBe(true);
        expect(confirmPasswordErrored).toBe(true);
    });

    test('it validates the form when submit is clicked', () => {
        const { getByText, getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        const currentPasswordInput = getByLabelText(/Current Password/);
        const newPasswordInput = getByLabelText(/New Password/);
        const confirmPasswordInput = getByLabelText(/Confirm Password/);

        fireEvent.change(currentPasswordInput, { target: { value: '' } });
        fireEvent.change(newPasswordInput, { target: { value: '' } });
        fireEvent.change(confirmPasswordInput, { target: { value: '' } });

        const submitButton = getByText(/Submit/);

        fireEvent.click(submitButton);

        const currentPasswordLabel = getByText(/Current Password/);
        const newPasswordLabel = getByText(/New Password/);
        const confirmPasswordLabel = getByText(/Confirm Password/);

        const currentPasswordErrored = currentPasswordLabel.classList.contains('errored');
        const newPasswordErrored = newPasswordLabel.classList.contains('errored');
        const confirmPasswordErrored = confirmPasswordLabel.classList.contains('errored');

        expect(currentPasswordErrored).toBe(true);
        expect(newPasswordErrored).toBe(true);
        expect(confirmPasswordErrored).toBe(true);
    });

    test('it successfully changes the password', async () => {
        const { getByText, getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <ChangePasswordForm user={testUser} />
            </MockedThemeProvider>
        );

        const currentPasswordInput = getByLabelText(/Current Password/);
        const newPasswordInput = getByLabelText(/New Password/);
        const confirmPasswordInput = getByLabelText(/Confirm Password/);

        fireEvent.change(currentPasswordInput, { target: { value: 'ThisIsInsecure123' } });
        fireEvent.change(newPasswordInput, { target: { value: 'ThisIsTooInsecure1234' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'ThisIsTooInsecure1234' } });

        const submitButton = getByText(/Submit/);

        fireEvent.click(submitButton);

        await waitForElement(() => getByText(/Password changed successfully/));
    });
});
