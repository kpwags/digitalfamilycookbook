import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AuthGateway } from '../../components/AuthGateway/AuthGateway';
import { EditInvitationCode } from '../../components/EditInvitationCode/EditInvitationCode';
import { AddInvitationCode } from '../../components/AddInvitationCode/AddInvitationCode';
import { AdminLayout } from '../../components/AdminLayout/AdminLayout';
import { ALL_INVITATION_CODES_QUERY } from '../../queries/InvitationCode';
import { LoadingBox } from '../../components/LoadingBox/LoadingBox';
import { PageError } from '../../components/PageError/PageError';
import { Grid } from '../../components/Grid/Grid';
import { AdminHeader } from '../../components/AdminHeader/AdminHeader';
import { AddButton } from '../../components/AddButton/AddButton';
import { HeaderForm } from '../../components/HeaderForm/HeaderForm';
import { DeleteInvitationCode } from '../../components/DeleteInvitationCode/DeleteInvitationCode';
import { Utilities } from '../../lib/Utilities';
import { AppContext } from '../../components/AppContext/AppContext';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';

const InvitationCodes = () => {
    const [selected, setSelected] = useState({ id: '', code: '' });
    const [error, setError] = useState(null);
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [editFormOpen, setEditFormOpen] = useState(false);

    const { data, error: queryError, loading } = useQuery(ALL_INVITATION_CODES_QUERY);

    const { toggleOverlay } = useContext(AppContext);

    return (
        <>
            <AuthGateway redirectUrl="/admin/invitation-codes" permissionNeeded="ADMIN">
                <AdminLayout activePage="invitationcodes">
                    <AdminHeader title="Invitation Codes">
                        <AddButton>
                            <button
                                onClick={(e) => {
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
                            onComplete={() => {
                                setAddFormOpen(false);
                            }}
                            onCancel={() => {
                                setAddFormOpen(false);
                            }}
                        />
                    </HeaderForm>

                    <HeaderForm width="500" style={editFormOpen ? { display: 'block' } : { display: 'none' }}>
                        <EditInvitationCode
                            id={selected.id}
                            code={selected.code}
                            onComplete={() => {
                                setEditFormOpen(false);
                            }}
                            onCancel={() => {
                                setEditFormOpen(false);
                            }}
                        />
                    </HeaderForm>

                    {loading && (
                        <div>
                            <LoadingBox />
                        </div>
                    )}

                    {queryError && (
                        <PageError
                            error={{
                                Title: 'Error Loading Categories',
                                Message: queryError,
                            }}
                        />
                    )}

                    {!loading && (
                        <>
                            <ErrorMessage message={error} />
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
                                            data.invitationCodes.map((invitationCode) => (
                                                <tr key={invitationCode.id} id={`row_${invitationCode.id}`}>
                                                    <td>{invitationCode.code}</td>
                                                    <td>{Utilities.formatDate(invitationCode.createdAt)}</td>
                                                    <td align="center">
                                                        <button
                                                            type="button"
                                                            data-id={invitationCode.id}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSelected(invitationCode);
                                                                setEditFormOpen(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td align="center">
                                                        <DeleteInvitationCode
                                                            id={invitationCode.id}
                                                            code={invitationCode.code}
                                                            onComplete={() => {
                                                                toggleOverlay();
                                                            }}
                                                            onCancel={() => {
                                                                toggleOverlay();
                                                            }}
                                                            onError={(err) => {
                                                                setError(err);
                                                            }}
                                                        >
                                                            Delete
                                                        </DeleteInvitationCode>
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
                        </>
                    )}
                </AdminLayout>
            </AuthGateway>
        </>
    );
};

export default InvitationCodes;
