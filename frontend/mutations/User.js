import gql from 'graphql-tag';

const CHANGE_PASSWORD_MUTATION = gql`
    mutation CHANGE_PASSWORD_MUTATION($id: ID!, $currentPassword: String!, $password: String!) {
        changePassword(id: $id, currentPassword: $currentPassword, password: $password) {
            id
            name
            email
            bio
            image
            largeImage
        }
    }
`;

const UPDATE_PROFILE_MUTATION = gql`
    mutation UPDATE_PROFILE_MUTATION(
        $id: ID!
        $name: String!
        $username: String!
        $email: String!
        $bio: String
        $image: String
        $largeImage: String
    ) {
        updateUser(
            id: $id
            name: $name
            username: $username
            email: $email
            bio: $bio
            image: $image
            largeImage: $largeImage
        ) {
            id
            name
            username
            email
            bio
            image
            largeImage
        }
    }
`;

export { UPDATE_PROFILE_MUTATION };
export { CHANGE_PASSWORD_MUTATION };
