import { render, waitForElement } from '@testing-library/react';
// import { render, screen, wait, fireEvent, waitForElement } from '@testing-library/react';
// import user from '@testing-library/user-event';
import { UPDATE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { SINGLE_INVITATION_CODE_CODE_QUERY } from '../../queries/InvitationCode';
import { TestInvitationCode, MockedThemeProvider } from '../../lib/TestUtilities';
import { EditInvitationCode } from './EditInvitationCode';

describe('<AddInvitationCode/>', () => {
    const code = TestInvitationCode();
    const mocks = [
        {
            request: {
                query: UPDATE_INVITATION_CODE_MUTATION,
                variables: {
                    id: code.id,
                    code: code.code
                }
            },
            updateInvitationCode: jest.fn(() => ({
                data: {
                    updateInvitationCode: {
                        id: code.id,
                        code: code.code
                    }
                }
            }))
        },
        {
            request: {
                query: SINGLE_INVITATION_CODE_CODE_QUERY,
                variables: {
                    code: code.code
                }
            },
            result: {
                invitationCode: {
                    id: code.id,
                    code: code.code
                }
            }
        }
    ];

    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider mocks={mocks}>
                <EditInvitationCode id={code.id} code={code.code} onDone={() => {}} />
            </MockedThemeProvider>
        );

        await waitForElement(() => getByLabelText(/Code/));
    });

    // TODO: Figure this out
    // test('it creates a category when the form is submited', async () => {
    //     const { getByText, getByLabelText } = render(
    //         <MockedThemeProvider mocks={mocks}>
    //             <EditInvitationCode id={code.id} code={code.code} onDone={() => {}} />
    //         </MockedThemeProvider>
    //     );

    //     const codeInput = getByLabelText(/Code/);

    //     await user.type(codeInput, code.code);

    //     const editButton = getByText(/Save Changes/);

    //     fireEvent.click(editButton);
    // });
});
