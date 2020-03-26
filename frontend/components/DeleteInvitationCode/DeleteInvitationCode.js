import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { DELETE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY } from '../../queries/InvitationCode';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { ErrorAlert } from '../ErrorAlert/ErrorAlert';
import { AppContext } from '../AppContext/AppContext';

const DeleteInvitationCode = props => {
    const [error, setError] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, code, children } = props;

    const updateCache = (cache, { data: result }) => {
        const codeData = cache.readQuery({ query: ALL_INVITATION_CODES_QUERY });

        codeData.invitationCodes = codeData.invitationCodes.filter(
            inviteCode => inviteCode.id !== result.deleteInvitationCode.id
        );

        cache.writeQuery({ query: ALL_INVITATION_CODES_QUERY, data: codeData });
    };

    const { toggleOverlay } = useContext(AppContext);

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
            <ErrorAlert error={error || deleteError} />
            <ConfirmDialog
                open={confirmOpen}
                message={`Are you sure you want to delete ${code}?`}
                continue={async () => {
                    await deleteInvitationCode({
                        variables: { id }
                    }).catch(err => {
                        setError(err);
                    });

                    props.continue(error);
                }}
                cancel={() => {
                    setConfirmOpen(false);
                    props.cancel();
                }}
            />
            <button type="button" onClick={confirmDelete} className="delete">
                {children}
            </button>
        </>
    );
};

DeleteInvitationCode.propTypes = {
    id: PropTypes.string,
    code: PropTypes.string,
    continue: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    children: PropTypes.node
};

export { DeleteInvitationCode };
