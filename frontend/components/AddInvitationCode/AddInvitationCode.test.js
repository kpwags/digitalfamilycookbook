import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CREATE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY, SINGLE_INVITATION_CODE_CODE_QUERY } from '../../queries/InvitationCode';
import { TestInvitationCode, MockedThemeProvider } from '../../lib/TestUtilities';
import { AddInvitationCode } from './AddInvitationCode';

const invitationCode = {
    id: '0987654321',
    code: 'testcode123',
};

const mockClient = createMockClient();
const duplicateCheckMockClient = createMockClient();

// Mock the result of the login mutation
const addInvitationCodeMutationHandler = jest.fn().mockResolvedValue({
    data: {
        createInvitationCode: {
            id: invitationCode.id,
            code: invitationCode.code,
        },
    },
});

const allInvitationCodesQueryHandler = jest.fn().mockResolvedValue({
    data: {
        invitationCodes: [TestInvitationCode(), TestInvitationCode(), TestInvitationCode()],
    },
});

const singleInvitationCodeQueryHandler = jest.fn().mockResolvedValue({
    data: {
        invitationCode: {
            id: '1234567890',
            code: 'testcode',
        },
    },
});

const singleInvitationCodeEmptyQueryHandler = jest.fn().mockResolvedValue({
    data: {
        invitationCode: null,
    },
});

mockClient.setRequestHandler(CREATE_INVITATION_CODE_MUTATION, addInvitationCodeMutationHandler);
duplicateCheckMockClient.setRequestHandler(CREATE_INVITATION_CODE_MUTATION, addInvitationCodeMutationHandler);

mockClient.setRequestHandler(ALL_INVITATION_CODES_QUERY, allInvitationCodesQueryHandler);
duplicateCheckMockClient.setRequestHandler(ALL_INVITATION_CODES_QUERY, allInvitationCodesQueryHandler);

mockClient.setRequestHandler(SINGLE_INVITATION_CODE_CODE_QUERY, singleInvitationCodeEmptyQueryHandler);
duplicateCheckMockClient.setRequestHandler(SINGLE_INVITATION_CODE_CODE_QUERY, singleInvitationCodeQueryHandler);

describe('<AddInvitationCode />', () => {
    test('it renders the input', async () => {
        const { getByLabelText } = render(
            <MockedThemeProvider>
                <AddInvitationCode />
            </MockedThemeProvider>
        );

        await waitFor(() => getByLabelText(/Code/));
    });

    test('it creates an invitation code when the form is submited', async () => {
        await act(async () => {
            const { findByText, getByLabelText, getByTestId } = render(
                <ApolloProvider client={mockClient}>
                    <AddInvitationCode />
                </ApolloProvider>
            );

            await waitFor(() =>
                fireEvent.change(getByLabelText(/Code/), {
                    target: {
                        value: invitationCode.code,
                    },
                })
            );

            await waitFor(() => fireEvent.blur(getByLabelText(/Code/)));

            await findByText(/OK/);

            await waitFor(() => fireEvent.click(getByTestId(/savebutton/)));
        });

        expect(singleInvitationCodeEmptyQueryHandler).toBeCalledTimes(2);

        expect(addInvitationCodeMutationHandler).toBeCalledWith({
            code: invitationCode.code,
        });

        expect(allInvitationCodesQueryHandler).toBeCalledTimes(1);
    });

    test('it alerts the user a invitation code is required if left blank', async () => {
        const { findByText, getByTestId } = render(
            <ApolloProvider client={mockClient}>
                <AddInvitationCode />
            </ApolloProvider>
        );

        await waitFor(() => fireEvent.click(getByTestId(/savebutton/)));

        // Assert that the error message was displayed
        await findByText(/Invitation code is required/);
    });

    test('it alerts the user the code already exists if a duplicate is typed', async () => {
        await act(async () => {
            const { findByText, getByLabelText } = render(
                <ApolloProvider client={duplicateCheckMockClient}>
                    <AddInvitationCode />
                </ApolloProvider>
            );

            await waitFor(() =>
                fireEvent.change(getByLabelText(/Code/), {
                    target: {
                        value: invitationCode.code,
                    },
                })
            );

            await waitFor(() => fireEvent.blur(getByLabelText(/Code/)));

            await findByText(/Invitation code already exists/);
        });

        expect(singleInvitationCodeQueryHandler).toBeCalledTimes(1);
    });
});
