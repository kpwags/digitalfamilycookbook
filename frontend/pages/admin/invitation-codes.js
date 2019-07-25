import React, { Component } from 'react';
import { InvitationCodeGrid } from '../../components/admin/invitation_code/InvitationCodeGrid';
import { AddButton } from '../../components/styles/AddButton';
import { CreateInvitationCode } from '../../components/admin/invitation_code/CreateInvitationCode';
import { AuthGateway } from '../../components/AuthGateway';
import { ModalWindow } from '../../components/elements/ModalWindow';

class InvitationCodes extends Component {
    static showCreateInvitationCodeForm(e) {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById('add-invitation-code-window').style.display = 'block';
        document.getElementById('add-invitation-code-code').focus();
    }

    render() {
        return (
            <>
                <AuthGateway redirectUrl="/admin/invitation-codes" permissionNeeded="ADMIN">
                    <h1>Manage Invitation Codes</h1>
                    <AddButton>
                        <button onClick={InvitationCodes.showCreateInvitationCodeForm} type="button">
                            Add New Invitation Code
                        </button>
                    </AddButton>
                    <ModalWindow id="add-invitation-code-window" width="500" height="215">
                        <CreateInvitationCode />
                    </ModalWindow>
                    <InvitationCodeGrid />
                </AuthGateway>
            </>
        );
    }
}

export default InvitationCodes;
