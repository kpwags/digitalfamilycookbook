import gql from 'graphql-tag';

const CREATE_INVITATION_CODE_MUTATION = gql`
    mutation CREATE_INVITATION_CODE_MUTATION($code: String!) {
        createInvitationCode(code: $code) {
            id
            code
        }
    }
`;

const UPDATE_INVITATION_CODE_MUTATION = gql`
    mutation UPDATE_INVITATION_CODE_MUTATION($id: ID!, $code: String) {
        updateInvitationCode(id: $id, code: $code) {
            id
            code
        }
    }
`;

const DELETE_INVITATION_CODE_MUTATION = gql`
    mutation DELETE_INVITATION_CODE_MUTATION($id: ID!) {
        deleteInvitationCode(id: $id) {
            id
        }
    }
`;

export { CREATE_INVITATION_CODE_MUTATION, UPDATE_INVITATION_CODE_MUTATION, DELETE_INVITATION_CODE_MUTATION };
