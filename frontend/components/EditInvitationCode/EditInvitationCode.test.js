import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { UPDATE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY, SINGLE_INVITATION_CODE_CODE_QUERY } from '../../queries/InvitationCode';
import { TestInvitationCode, MockedThemeProvider } from '../../lib/TestUtilities';
import { EditInvitationCode } from './EditInvitationCode';

describe('<EditInvitationCode/>', () => {
    const invitationCode = TestInvitationCode();
    const newInvitationCode = TestInvitationCode();

    const mockClient = createMockClient();
    const duplicateCheckMockClient = createMockClient();

    // Mock the result of the login mutation
    const updateInvitationCodeHandler = jest.fn().mockResolvedValue({
        data: {
            updateInvitationCode: {
                id: newInvitationCode.id,
                code: newInvitationCode.code,
            },
        },
    });

    const allInvitationCodesHandler = jest.fn().mockResolvedValue({
        data: {
            invitationCodes: [TestInvitationCode(), TestInvitationCode(), TestInvitationCode()],
        },
    });

    const singleInvitationCodeHandler = jest.fn().mockResolvedValue({
        data: {
            invitationCode: {
                id: '1234567890',
                code: 'testcode',
            },
        },
    });

    const singleInvitationCodeEmptyHandler = jest.fn().mockResolvedValue({
        data: {
            invitationCode: null,
        },
    });

    mockClient.setRequestHandler(UPDATE_INVITATION_CODE_MUTATION, updateInvitationCodeHandler);
    duplicateCheckMockClient.setRequestHandler(UPDATE_INVITATION_CODE_MUTATION, updateInvitationCodeHandler);

    mockClient.setRequestHandler(ALL_INVITATION_CODES_QUERY, allInvitationCodesHandler);
    duplicateCheckMockClient.setRequestHandler(ALL_INVITATION_CODES_QUERY, allInvitationCodesHandler);

    mockClient.setRequestHandler(SINGLE_INVITATION_CODE_CODE_QUERY, singleInvitationCodeEmptyHandler);
    duplicateCheckMockClient.setRequestHandler(SINGLE_INVITATION_CODE_CODE_QUERY, singleInvitationCodeHandler);

    test('it renders the input', async () => {
        const { findByLabelText } = render(
            <MockedThemeProvider>
                <EditInvitationCode id={invitationCode.id} code={invitationCode.code} onDone={() => {}} />
            </MockedThemeProvider>
        );

        const codeInput = await findByLabelText(/Code/);
        expect(codeInput.value).toBe(invitationCode.code);
    });

    test('it alerts the user a code is required if left blank', async () => {
        const { findByText, getByLabelText } = render(
            <ApolloProvider client={mockClient}>
                <EditInvitationCode id={invitationCode.id} code={invitationCode.code} />
            </ApolloProvider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(await getByLabelText(/Code/), {
                    target: {
                        value: '',
                    },
                });
            });

            await waitFor(async () => {
                fireEvent.blur(await getByLabelText(/Code/));
            });
        });

        // Assert that the error message was displayed
        await findByText(/Invitation code is required/);
    });

    test('it updates a category when the form is submited', async () => {
        const { findByText, getByLabelText, getByTestId } = render(
            <ApolloProvider client={mockClient}>
                <EditInvitationCode id={invitationCode.id} code={invitationCode.code} />
            </ApolloProvider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(await getByLabelText(/Code/), {
                    target: {
                        value: newInvitationCode.code,
                    },
                });
            });

            await waitFor(() => fireEvent.blur(getByLabelText(/Code/)));

            await findByText(/OK/);

            await waitFor(() => fireEvent.click(getByTestId(/savebutton/)));
        });

        expect(updateInvitationCodeHandler).toBeCalledWith({
            id: invitationCode.id,
            code: newInvitationCode.code,
        });

        expect(allInvitationCodesHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a code already exists', async () => {
        const { findByText, getByLabelText } = render(
            <ApolloProvider client={duplicateCheckMockClient}>
                <EditInvitationCode id="01234567890" code="testcode" />
            </ApolloProvider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(await getByLabelText(/Code/), {
                    target: {
                        value: 'testcode',
                    },
                });
            });

            await waitFor(async () => {
                fireEvent.blur(await getByLabelText(/Code/));
            });
        });

        // Assert that the error message was displayed
        await findByText(/Invitation code already exists/);
    });

    test('it okays a code that already exists if it is the currently selected code', async () => {
        const { findByText, getByLabelText } = render(
            <ApolloProvider client={duplicateCheckMockClient}>
                <EditInvitationCode id="1234567890" code="testcode" />
            </ApolloProvider>
        );

        await act(async () => {
            await waitFor(async () => {
                fireEvent.change(await getByLabelText(/Code/), {
                    target: {
                        value: 'testcode',
                    },
                });
            });

            await waitFor(async () => {
                fireEvent.blur(await getByLabelText(/Code/));
            });
        });

        // Assert that the OK message was displayed
        await findByText(/OK/);
    });
});
