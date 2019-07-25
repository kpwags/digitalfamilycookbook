import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ALL_INVITATION_CODES_QUERY } from '../../../queries/InvitationCode';
import { AdminGrid } from '../../styles/AdminGrid';
import { DeleteInvitationCode } from './DeleteInvitationCode';
import { EditInvitationCode } from './EditInvitationCode';
import { ModalWindow } from '../../elements/ModalWindow';

class InvitationCodeGrid extends Component {
    state = {
        selected: {
            id: '',
            code: ''
        }
    };

    showEditInvitationCodeForm(invitationCode) {
        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('edit-invitation-code-window').style.display = 'block';
        document.getElementById('edit-invitation-code-code').focus();

        this.setState({ selected: { id: invitationCode.id, code: invitationCode.code } });
    }

    render() {
        const gridStyle = {
            width: '500px'
        };
        return (
            <>
                <ModalWindow id="edit-invitation-code-window" width="500" height="215">
                    <EditInvitationCode id={this.state.selected.id} code={this.state.selected.code} />
                </ModalWindow>

                <AdminGrid cellPadding="0" cellSpacing="0" id="invitationcodeadmingrid" style={gridStyle}>
                    <thead>
                        <tr>
                            <th width="70%" className="no-border">
                                Code
                            </th>
                            <th width="15%" className="no-border">
                                &nbsp;
                            </th>
                            <th width="15%">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Query query={ALL_INVITATION_CODES_QUERY}>
                            {({ data, error, loading }) => {
                                if (loading)
                                    return (
                                        <tr>
                                            <td colSpan="3">Loading...</td>
                                        </tr>
                                    );
                                if (error)
                                    return (
                                        <tr>
                                            <td colSpan="3">Error: {error.message}</td>
                                        </tr>
                                    );
                                return data.invitationCodes.length > 0 ? (
                                    data.invitationCodes.map(invitationCode => (
                                        <tr key={invitationCode.id} id={invitationCode.id}>
                                            <td>{invitationCode.code}</td>
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
                                                <DeleteInvitationCode id={invitationCode.id} code={invitationCode.code}>
                                                    Delete
                                                </DeleteInvitationCode>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            <em>No Invitation Codes Defined</em>
                                        </td>
                                    </tr>
                                );
                            }}
                        </Query>
                    </tbody>
                </AdminGrid>
            </>
        );
    }
}

export { InvitationCodeGrid };
