import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { AuthGateway } from '../../components/AuthGateway';
import { DeleteInvitationCode } from '../../components/admin/DeleteInvitationCode/DeleteInvitationCode';
import { EditInvitationCode } from '../../components/admin/EditInvitationCode/EditInvitationCode';
import { AddInvitationCode } from '../../components/admin/AddInvitationCode/AddInvitationCode';
import { AdminLayout } from '../../components/admin/AdminLayout/AdminLayout';
import { ALL_INVITATION_CODES_QUERY } from '../../queries/InvitationCode';
import { LoadingBox } from '../../components/elements/LoadingBox';
import { PageError } from '../../components/elements/PageError';
import { AdminGrid } from '../../components/styles/AdminGrid';
import { PageHeader } from '../../components/admin/PageHeader/PageHeader';
import { AddButton } from '../../components/styles/AddButton';
import { HeaderForm } from '../../components/styles/HeaderForm';
import { Utilities } from '../../lib/Utilities';

class InvitationCodes extends Component {
    static showAddInvitationCodeForm(e) {
        e.preventDefault();

        document.getElementById('create-invitation-code-header-form').style.display = 'block';
        document.getElementById('add-invitation-code-code').focus();
    }

    state = {
        selected: {
            id: '',
            code: ''
        }
    };

    showEditInvitationCodeForm(code) {
        this.setState({ selected: code });

        document.getElementById('edit-invitation-code-header-form').style.display = 'block';
        document.getElementById('edit-invitation-code-code').focus();
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/invitation-codes" permissionNeeded="ADMIN">
                    <AdminLayout activePage="invitationcodes">
                        <PageHeader title="Invitation Codes">
                            <AddButton>
                                <button onClick={InvitationCodes.showAddInvitationCodeForm} type="button">
                                    + Add
                                </button>
                            </AddButton>
                        </PageHeader>

                        <HeaderForm id="create-invitation-code-header-form" width="500">
                            <AddInvitationCode />
                        </HeaderForm>

                        <HeaderForm id="edit-invitation-code-header-form" width="500">
                            <EditInvitationCode id={this.state.selected.id} code={this.state.selected.code} />
                        </HeaderForm>

                        <Query query={ALL_INVITATION_CODES_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <div>
                                            <LoadingBox />
                                        </div>
                                    );
                                if (error)
                                    return (
                                        <PageError
                                            error={{
                                                Title: 'Error Loading Invitation Codes',
                                                Message: error
                                            }}
                                        />
                                    );

                                return (
                                    <AdminGrid>
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
                                                                        this.showEditInvitationCodeForm(invitationCode);
                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>
                                                            <td align="center">
                                                                <DeleteInvitationCode
                                                                    id={invitationCode.id}
                                                                    code={invitationCode.code}
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
                                    </AdminGrid>
                                );
                            }}
                        </Query>
                    </AdminLayout>
                </AuthGateway>
            </>
        );
    }
}

export default InvitationCodes;
