import gql from 'graphql-tag';

const SINGLE_USER_QUERY = gql`
    query SINGLE_USER_QUERY($id: ID!) {
        user(where: { id: $id }) {
            id
            name
            username
            bio
            image
            largeImage
        }
    }
`;

const SINGLE_USER_USERNAME_QUERY = gql`
    query SINGLE_USER_USERNAME_QUERY($username: String!) {
        user(where: { username: $username }) {
            id
            name
            username
            bio
            image
            largeImage
        }
    }
`;

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
            name
            username
            bio
            image
            largeImage
            permissions
        }
    }
`;

export { SINGLE_USER_QUERY };
export { SINGLE_USER_USERNAME_QUERY };
export { CURRENT_USER_QUERY };
