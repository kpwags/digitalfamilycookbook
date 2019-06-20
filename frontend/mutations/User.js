import gql from 'graphql-tag';

const UPDATE_PROFILE_MUTATION = gql`
    mutation UPDATE_PROFILE_MUTATION($id: ID!, $name: String!, $email: String!) {
        updateUser(id: $id, name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export { UPDATE_PROFILE_MUTATION };
