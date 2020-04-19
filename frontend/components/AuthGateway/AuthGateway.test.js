import { render, waitForElement } from '@testing-library/react';
import { AuthGateway } from './AuthGateway';
import { MockedThemeProvider, TestUser, TestAdmin } from '../../lib/TestUtilities';
import { AppContext } from '../AppContext/AppContext';

const loggedInUser = TestUser();
const loggedInAdmin = TestAdmin();

describe('<AuthGateway/>', () => {
    test('it displays the content when user is logged in', async () => {
        const { getByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ loggedInUser }}>
                    <AuthGateway redirectUrl="/" permissionNeeded="USER">
                        <h1>Logged in Content</h1>
                    </AuthGateway>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Logged in Content/));
    });

    test('it displays the login form when the user is not logged in', async () => {
        const { getByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ loggedInUser: null }}>
                    <AuthGateway redirectUrl="/" permissionNeeded="USER">
                        <h1>Logged in Content</h1>
                    </AuthGateway>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Please sign in to continue/));
    });

    test('it lets the user know they do not have permission to access restricted pages', async () => {
        const { getByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ loggedInUser }}>
                    <AuthGateway redirectUrl="/" permissionNeeded="ADMIN">
                        <h1>Logged in Content</h1>
                    </AuthGateway>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/You do not have permission to access this page./));
    });

    test('it displays the content for an admin when they have the permission', async () => {
        const { getByText } = render(
            <MockedThemeProvider>
                <AppContext.Provider value={{ loggedInUser: loggedInAdmin }}>
                    <AuthGateway redirectUrl="/" permissionNeeded="ADMIN">
                        <h1>Logged in Content</h1>
                    </AuthGateway>
                </AppContext.Provider>
            </MockedThemeProvider>
        );

        await waitForElement(() => getByText(/Logged in Content/));
    });
});
