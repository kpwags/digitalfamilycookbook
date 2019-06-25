import gql from 'graphql-tag';

const UPDATE_PROFILE_MUTATION = gql`
    mutation UPDATE_PROFILE_MUTATION(
        $id: ID!
        $name: String!
        $email: String!
        $bio: String
        $image: String
        $largeImage: String
    ) {
        updateUser(id: $id, name: $name, email: $email, bio: $bio, image: $image, largeImage: $largeImage) {
            id
            name
            email
            bio
            image
            largeImage
        }
    }
`;

export { UPDATE_PROFILE_MUTATION };
