import gql from 'graphql-tag';

const ALL_INVITATION_CODES_QUERY = gql`
    query {
        invitationCodes {
            id
            code
        }
    }
`;

const SINGLE_INVITATION_CODE_CODE_QUERY = gql`
    query SINGLE_INVITATION_CODE_CODE_QUERY($code: String!) {
        invitationCode(where: { code: $code }) {
            id
            code
        }
    }
`;

export { ALL_INVITATION_CODES_QUERY };
export { SINGLE_INVITATION_CODE_CODE_QUERY };
