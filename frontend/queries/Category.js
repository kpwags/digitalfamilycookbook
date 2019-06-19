import gql from 'graphql-tag';

const ALL_CATEGORIES_QUERY = gql`
    query {
        categories {
            id
            name
        }
    }
`;

export { ALL_CATEGORIES_QUERY };
