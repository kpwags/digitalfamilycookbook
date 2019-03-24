import gql from 'graphql-tag';

const ALL_MEATS_QUERY = gql`
    query {
        meats {
            id
            name
        }
    }
`;

export { ALL_MEATS_QUERY };
