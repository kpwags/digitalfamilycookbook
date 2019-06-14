import gql from 'graphql-tag';

const CREATE_MEAT_MUTATION = gql`
    mutation CREATE_MEAT_MUTATION($name: String!) {
        createMeat(name: $name) {
            id
            name
        }
    }
`;

const UPDATE_MEAT_MUTATION = gql`
    mutation UPDATE_MEAT_MUTATION($id: ID!, $name: String) {
        updateMeat(id: $id, name: $name) {
            id
            name
        }
    }
`;

const DELETE_MEAT_MUTATION = gql`
    mutation DELETE_MEAT_MUTATION($id: ID!) {
        deleteMeat(id: $id) {
            id
        }
    }
`;

export { CREATE_MEAT_MUTATION };
export { UPDATE_MEAT_MUTATION };
export { DELETE_MEAT_MUTATION };
