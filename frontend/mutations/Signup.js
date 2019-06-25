import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
        $bio: String
        $image: String
        $largeImage: String
    ) {
        signup(email: $email, name: $name, password: $password, bio: $bio, image: $image, largeImage: $largeImage) {
            id
            email
            name
            bio
            image
            largeImage
        }
    }
`;

export { SIGNUP_MUTATION };
