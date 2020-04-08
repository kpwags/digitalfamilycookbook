import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { DELETE_INVITATION_CODE_MUTATION } from '../../mutations/InvitationCode';
import { ALL_INVITATION_CODES_QUERY } from '../../queries/InvitationCode';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import { AppContext } from '../AppContext/AppContext';

const DeleteInvitationCode = (props) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id, code, children } = props;

    const updateCache = (cache, { data: result }) => {
        const codeData = cache.readQuery({ query: ALL_INVITATION_CODES_QUERY });

        codeData.invitationCodes = codeData.invitationCodes.filter((inviteCode) => inviteCode.id !== result.deleteInvitationCode.id);

        cache.writeQuery({ query: ALL_INVITATION_CODES_QUERY, data: codeData });
    };

    const { toggleOverlay } = useContext(AppContext);

    const [deleteInvitationCode] = useMutation(DELETE_INVITATION_CODE_MUTATION, {
        update: updateCache,
        onCompleted: () => {
            toast(`${code} deleted successfully`);
            props.onComplete();
        },
        onError: (err) => {
            props.onError(err);
        },
    });

    const confirmDelete = (e) => {
        e.preventDefault();

        toggleOverlay();
        setConfirmOpen(!confirmOpen);
    };

    return (
        <>
            <ConfirmDialog
                open={confirmOpen}
                message={`Are you sure you want to delete ${code}?`}
                continue={async () => {
                    await deleteInvitationCode({
                        variables: { id },
                    }).catch((err) => {
                        props.onError(err);
                    });
                }}
                cancel={() => {
                    setConfirmOpen(false);
                    props.onCancel();
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
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export { DeleteInvitationCode };
