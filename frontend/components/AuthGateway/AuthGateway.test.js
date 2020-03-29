import { render, waitForElement } from '@testing-library/react';
import { AuthGateway } from './AuthGateway';
import { CURRENT_USER_QUERY } from '../../queries/User';
import { MockedThemeProvider, TestUser } from '../../lib/TestUtilities';

const loggedInMocks = [
    {
        request: {
            query: CURRENT_USER_QUERY
        },
        result: {
            data: {
                me: TestUser()
            }
        }
    }
];

const loggedOutMocks = [
    {
        request: {
            query: CURRENT_USER_QUERY
        },
        result: {
            data: {
                me: null
            }
        }
    }
];

describe('<AuthGateway/>', () => {
    test('it displays the content when user is logged in', async () => {
        const { getByText } = render(
            <MockedThemeProvider mocks={loggedInMocks}>
                <AuthGateway redirectUrl="/" permissionNeeded="USER">
                    <h1>Logged in Content</h1>
                </AuthGateway>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Logged in Content/));
    });

    test('it displays the login form when the user is not logged in', async () => {
        const { getByText } = render(
            <MockedThemeProvider mocks={loggedOutMocks}>
                <AuthGateway redirectUrl="/" permissionNeeded="USER">
                    <h1>Logged in Content</h1>
                </AuthGateway>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Please sign in to continue/));
    });

    test('it lets the user know they do not have permission to access restricted pages', async () => {
        const { getByText } = render(
            <MockedThemeProvider mocks={loggedInMocks}>
                <AuthGateway redirectUrl="/" permissionNeeded="ADMIN">
                    <h1>Logged in Content</h1>
                </AuthGateway>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/You do not have permission to access this page./));
    });
});
