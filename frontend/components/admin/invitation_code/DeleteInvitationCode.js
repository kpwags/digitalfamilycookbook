import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { DELETE_INVITATION_CODE_MUTATION } from '../../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY } from '../../../queries/InvitationCode';
import { ConfirmDialog } from '../../styles/ConfirmDialog';
import { ErrorAlert } from '../../elements/ErrorAlert';

class DeleteInvitationCode extends Component {
    static propTypes = {
        id: PropTypes.string,
        code: PropTypes.string,
        children: PropTypes.node
    };

    state = {
        error: null
    };

    update = (cache, payload) => {
        const data = cache.readQuery({ query: ALL_INVITATION_CODES_QUERY });

        data.invitationCodes = data.invitationCodes.filter(
            invitationCode => invitationCode.id !== payload.data.deleteInvitationCode.id
        );

        cache.writeQuery({ query: ALL_INVITATION_CODES_QUERY, data });
    };

    confirmDelete = e => {
        e.preventDefault();

        document.getElementById('page-overlay').style.display = 'block';
        document.getElementById(`confirm-invitation-code-delete-${this.props.id}`).style.display = 'block';
    };

    render() {
        const { id, code } = this.props;

        return (
            <Mutation mutation={DELETE_INVITATION_CODE_MUTATION} variables={{ id }} update={this.update}>
                {(deleteInvitationCode, { error }) => (
                    <>
                        <ErrorAlert id={`delete-invitation-code-error-${id}`} error={error || this.state.error} />
                        <ConfirmDialog
                            id={`confirm-invitation-code-delete-${id}`}
                            message={`Are you sure you want to delete the invitation code: ${code}?`}
                            height="180"
                            continue={async () => {
                                await deleteInvitationCode().catch(err => {
                                    this.setState({ error: err });
                                });

                                if (this.state.error === null) {
                                    document.getElementById('page-overlay').style.display = 'none';
                                }
                            }}
                        />
                        <button type="button" onClick={this.confirmDelete}>
                            {this.props.children}
                        </button>
                    </>
                )}
            </Mutation>
        );
    }
}

export { DeleteInvitationCode };
