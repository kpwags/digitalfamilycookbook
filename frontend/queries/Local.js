import gql from 'graphql-tag';

const LOCAL_STATE_QUERY = gql`
    query {
        overlayVisible @client
    }
`;

export { LOCAL_STATE_QUERY };
