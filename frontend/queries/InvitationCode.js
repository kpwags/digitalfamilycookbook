import gql from 'graphql-tag';

const ALL_INVITATION_CODES_QUERY = gql`
    query {
        invitationCodes(orderBy: code_ASC) {
            id
            code
            createdAt
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

export { ALL_INVITATION_CODES_QUERY, SINGLE_INVITATION_CODE_CODE_QUERY };
