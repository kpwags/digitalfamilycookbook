import gql from 'graphql-tag';

const SINGLE_USER_QUERY = gql`
    query SINGLE_USER_QUERY($id: ID!) {
        user(where: { id: $id }) {
            id
            name
            bio
            image
            largeImage
        }
    }
`;

export { SINGLE_USER_QUERY };
