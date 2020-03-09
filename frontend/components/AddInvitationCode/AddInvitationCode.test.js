import { render, waitForElement } from '@testing-library/react';
// import { render, screen, wait, fireEvent, waitForElement } from '@testing-library/react';
// import user from '@testing-library/user-event';
import { CREATE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { TestInvitationCode, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddInvitationCode } from './AddInvitationCode';

describe('<AddInvitationCode/>', () => {
    const code = TestInvitationCode();
    const mocks = [
        {
            request: {
                query: CREATE_INVITATION_CODE_MUTATION,
                variables: {
                    code: code.code
                }
            },
            createInvitationCode: jest.fn(() => ({
                data: {
                    createInvitationCode: {
                        id: code.id,
                        code: code.code
                    }
                }
            }))
        }
    ];

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <AddInvitationCode />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByLabelText(/Code/));
    });

    // TODO: Figure this out
    // test('it creates a category when the form is submited', async () => {
    //     const { getByText, getByLabelText } = render(
    //         <MockedThemeProvider mocks={mocks}>
    //             <AddCategory />
    //         </MockedThemeProvider>
    //     );

    //     const categoryInput = getByLabelText(/Name/);

    //     await user.type(categoryInput, category.name);

    //     const addCategoryButton = getByText(/Save/);

    //     fireEvent.click(addCategoryButton);

    //     const addCategoryMutation = mocks[0].createCategory;
    //     await wait(() => expect(addCategoryMutation).toHaveBeenCalled());
    // });
});
