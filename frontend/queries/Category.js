import gql from 'graphql-tag';

const ALL_CATEGORIES_QUERY = gql`
    query {
        categories {
            id
            name
        }
    }
`;

const CATEGORY_BY_ID_QUERY = gql`
    query CATEGORY_BY_ID_QUERY($id: ID!) {
        category(where: { id: $id }) {
            id
            name
        }
    }
`;

export { ALL_CATEGORIES_QUERY };
export { CATEGORY_BY_ID_QUERY };
