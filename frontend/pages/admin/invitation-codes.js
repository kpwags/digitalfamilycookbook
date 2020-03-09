import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { EditInvitationCode } from '../../components/EditInvitationCode/EditInvitationCode';
import { AddInvitationCode } from '../../components/AddInvitationCode/AddInvitationCode';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';
import { ALL_INVITATION_CODES_QUERY } from '../../queries/InvitationCode';
import { DELETE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { Grid } from '../../components/Grid/Grid';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AddButton } from '../../components/AddButton/AddButton';
import { HeaderForm } from '../../components/HeaderForm/HeaderForm';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../../components/ErrorAlert/ErrorAlert';
import { Utilities } from '../../lib/Utilities';
import { TOGGLE_OVERLAY_MUTATION } from '../../mutations/Local';

const InvitationCodes = () => {
    const [selected, setSelected] = useState({ id: '', code: '' });
    const [error, setError] = useState(null);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data, error: queryError, loading } = useQuery(ALL_INVITATION_CODES_QUERY);

    const updateCache = (cache, { data: result }) => {
        const codeData = cache.readQuery({ query: ALL_INVITATION_CODES_QUERY });

        codeData.invitationCodes = codeData.invitationCodes.filter(code => code.id !== result.deleteInvitationCode.id);

        cache.writeQuery({ query: ALL_INVITATION_CODES_QUERY, data: codeData });
    };

    const [toggleOverlay] = useMutation(TOGGLE_OVERLAY_MUTATION);
    const [deleteInvitationCode, { error: deleteError }] = useMutation(DELETE_INVITATION_CODE_MUTATION, {
        update: updateCache
    });

    const confirmDelete = e => {
        e.preventDefault();

        toggleOverlay();
        setConfirmOpen(!confirmOpen);
    };

    return (
        <>
            <AuthGateway redirectUrl="/admin/invitation-codes" permissionNeeded="ADMIN">
                <AdminLayout activePage="invitationcodes">
                    <AdminHeader title="Invitation Codes">
                        <AddButton>
                            <button
                                onClick={e => {
                                    e.preventDefault();
                                    setAddFormOpen(true);
                                }}
                                type="button"
                            >
                                + Add
                            </button>
                        </AddButton>
                    </AdminHeader>

                    <HeaderForm width="500" style={addFormOpen ? { display: 'block' } : { display: 'none' }}>
                        <AddInvitationCode
                            onDone={() => {
                                setAddFormOpen(false);
                            }}
                        />
                    </HeaderForm>

                    <HeaderForm width="500" style={editFormOpen ? { display: 'block' } : { display: 'none' }}>
                        <EditInvitationCode
                            id={selected.id}
                            code={selected.code}
                            key={selected.id}
                            onDone={() => {
                                setEditFormOpen(false);
                            }}
                        />
                    </HeaderForm>

                    {loading && (
                        <div>
                            <LoadingBox />
                        </div>
                    )}

                    {(error || queryError) && (
                        <PageError
                            error={{
                                Title: 'Error Loading Categories',
                                Message: error || queryError
                            }}
                        />
                    )}

                    {!loading && (
                        <Grid>
                            <table cellPadding="0" cellSpacing="0" id="invitationcodeadmingrid">
                                <thead>
                                    <tr>
                                        <th width="50%" className="no-border">
                                            Code
                                        </th>
                                        <th width="20%" className="no-border">
                                            Created
                                        </th>
                                        <th width="15%" className="no-border">
                                            &nbsp;
                                        </th>
                                        <th width="15%">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.invitationCodes.length > 0 ? (
                                        data.invitationCodes.map(invitationCode => (
                                            <tr key={invitationCode.id} id={`row_${invitationCode.id}`}>
                                                <td>{invitationCode.code}</td>
                                                <td>{Utilities.formatDate(invitationCode.createdAt)}</td>
                                                <td align="center">
                                                    <button
                                                        type="button"
                                                        data-id={invitationCode.id}
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            setSelected(invitationCode);
                                                            setEditFormOpen(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                                <td align="center">
                                                    <ErrorAlert error={deleteError || error} />
                                                    <ConfirmDialog
                                                        open={confirmOpen}
                                                        message={`Are you sure you want to delete ${invitationCode.code}?`}
                                                        continue={async () => {
                                                            await deleteInvitationCode({
                                                                variables: { id: invitationCode.id }
                                                            }).catch(err => {
                                                                setError(err);
                                                            });

                                                            if (error === null) {
                                                                setConfirmOpen(!confirmOpen);
                                                                toggleOverlay();
                                                            }
                                                        }}
                                                        cancel={() => {
                                                            setConfirmOpen(false);
                                                            toggleOverlay();
                                                        }}
                                                    />
                                                    <button type="button" onClick={confirmDelete} className="delete">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="no-rows">
                                                No Invitation Codes Defined
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Grid>
                    )}
                </AdminLayout>
            </AuthGateway>
        </>
    );
};

export default InvitationCodes;
