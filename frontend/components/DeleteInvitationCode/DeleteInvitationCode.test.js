import { render, waitFor, fireEvent } from '@testing-library/react';
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
        const { findByText } = render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteInvitationCode id={invitationCode.id} code={invitationCode.code} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteInvitationCode>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await findByText(/Delete/);
    });

    test('it deletes an invitation code', async () => {
        const { findByTestId, findByText, getByText } = render(
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

        fireEvent.click(await getByText(/Delete/));

        await findByText(/Are you sure you want to delete/);

        await waitFor(async () => fireEvent.click(await findByTestId(/confirm-delete/)));

        expect(deleteMutationHandler).toBeCalledWith({
            id: invitationCode.id,
        });
    });

    // TODO: Revisit Cancelling Delete
    // test('it cancels deleting an invitation code', async () => {
    //     const { findByTestId, findByText, getByText, getByTestId } = render(
    //         <ApolloProvider client={mockClient}>
    //             <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
    //                 <DeleteInvitationCode
    //                     id={invitationCode.id}
    //                     code={invitationCode.code}
    //                     onComplete={() => {}}
    //                     onCancel={() => {}}
    //                     onError={() => {}}
    //                     updateCache={false}
    //                 >
    //                     Delete
    //                 </DeleteInvitationCode>
    //             </AppContext.Provider>
    //         </ApolloProvider>
    //     );

    //     fireEvent.click(getByText(/Delete/));

    //     await findByText(/Are you sure you want to delete/);

    //     await findByTestId(/cancel-delete/);

    //     await waitFor(async () => fireEvent.click(getByTestId(/cancel-delete/)));

    //     expect(deleteMutationHandler).toBeCalledTimes(0);
    // });
});
