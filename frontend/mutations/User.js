import gql from 'graphql-tag';

const CHANGE_PASSWORD_MUTATION = gql`
    mutation CHANGE_PASSWORD_MUTATION(
        $id: ID!
        $currentPassword: String!
        $password: String!
    ) {
        changePassword(
            id: $id
            currentPassword: $currentPassword
            password: $password
        ) {
            id
            name
            email
            bio
            image
            largeImage
        }
    }
`;

const DELETE_USER_MUTATION = gql`
    mutation DELETE_USER_MUTATION($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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

const LOGOUT_MUTATION = gql`
    mutation LOGOUT_MUTATION {
        logout {
            message
        }
    }
`;

const REQUEST_PASSWORD_RESET_MUTATION = gql`
    mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
        requestPasswordReset(email: $email) {
            message
        }
    }
`;

const RESET_PASSWORD_MUTATION = gql`
    mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!) {
        resetPassword(resetToken: $resetToken, password: $password) {
            id
            email
            name
        }
    }
`;

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $username: String!
        $name: String!
        $password: String!
        $bio: String
        $invitationCode: String!
        $image: String
        $largeImage: String
    ) {
        signup(
            email: $email
            username: $username
            name: $name
            password: $password
            bio: $bio
            invitationCode: $invitationCode
            image: $image
            largeImage: $largeImage
        ) {
            id
            email
            username
            name
            bio
            image
            largeImage
        }
    }
`;

const TOGGLE_ADMIN_MUTATION = gql`
    mutation TOGGLE_ADMIN_MUTATION($id: ID!) {
        toggleAdmin(id: $id) {
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

export {
    CHANGE_PASSWORD_MUTATION,
    DELETE_USER_MUTATION,
    LOGOUT_MUTATION,
    LOGIN_MUTATION,
    REQUEST_PASSWORD_RESET_MUTATION,
    RESET_PASSWORD_MUTATION,
    SIGNUP_MUTATION,
    UPDATE_PROFILE_MUTATION,
    TOGGLE_ADMIN_MUTATION,
};
