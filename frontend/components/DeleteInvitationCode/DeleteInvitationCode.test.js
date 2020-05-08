import { render, screen, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY } from '../../queries/InvitationCode';
import { TestInvitationCode } from '../../lib/TestUtilities';
import { DeleteInvitationCode } from './DeleteInvitationCode';
import { AppContext } from '../AppContext/AppContext';

const invitationCode = TestInvitationCode();

const mockClient = createMockClient();

const deleteMutationHandler = jest.fn().mockResolvedValue({
    data: {
        deleteInvitationCode: {
            id: invitationCode.id,
        },
    },
});

const allQueryHandler = jest.fn().mockResolvedValue({
    data: {
        invitationCodes: [TestInvitationCode(), TestInvitationCode(), TestInvitationCode()],
    },
});

mockClient.setRequestHandler(DELETE_INVITATION_CODE_MUTATION, deleteMutationHandler);
mockClient.setRequestHandler(ALL_INVITATION_CODES_QUERY, allQueryHandler);

describe('<DeleteInvitationCode/>', () => {
    test('it renders the delete button', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteInvitationCode id={invitationCode.id} code={invitationCode.code} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteInvitationCode>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await screen.findByText(/Delete/);
    });

    test('it deletes an invitation code', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteInvitationCode
                        id={invitationCode.id}
                        code={invitationCode.code}
                        onComplete={() => {}}
                        onCancel={() => {}}
                        onError={() => {}}
                        updateCache={false}
                    >
                        Delete
                    </DeleteInvitationCode>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(await screen.getByText(/Delete/));

            await screen.findByText(/Are you sure you want to delete/);

            await fireEvent.click(await screen.getByTestId(/confirm-delete/));
        });

        expect(deleteMutationHandler).toBeCalledWith({
            id: invitationCode.id,
        });
    });
});
