import gql from 'graphql-tag';

const TOGGLE_OVERLAY_MUTATION = gql`
    mutation {
        toggleOverlay @client
    }
`;

export { TOGGLE_OVERLAY_MUTATION };
