import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $username: String!
        $name: String!
        $password: String!
        $bio: String
        $image: String
        $largeImage: String
    ) {
        signup(
            email: $email
            username: $username
            name: $name
            password: $password
            bio: $bio
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

export { SIGNUP_MUTATION };
