import gql from 'graphql-tag';

const CREATE_CATEGORY_MUTATION = gql`
    mutation CREATE_CATEGORY_MUTATION($name: String!) {
        createCategory(name: $name) {
            id
            name
        }
    }
`;

const UPDATE_CATEGORY_MUTATION = gql`
    mutation UPDATE_CATEGORY_MUTATION($id: ID!, $name: String) {
        updateCategory(id: $id, name: $name) {
            id
            name
        }
    }
`;

const DELETE_CATEGORY_MUTATION = gql`
    mutation DELETE_CATEGORY_MUTATION($id: ID!) {
        deleteCategory(id: $id) {
            id
        }
    }
`;

export { CREATE_CATEGORY_MUTATION };
export { UPDATE_CATEGORY_MUTATION };
export { DELETE_CATEGORY_MUTATION };
