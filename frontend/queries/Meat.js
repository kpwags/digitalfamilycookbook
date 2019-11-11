import gql from 'graphql-tag';

const ALL_MEATS_QUERY = gql`
    query {
        meats {
            id
            name
        }
    }
`;

const MEAT_BY_ID_QUERY = gql`
    query MEAT_BY_ID_QUERY($id: ID!) {
        meat(where: { id: $id }) {
            id
            name
        }
    }
`;

export { ALL_MEATS_QUERY };
export { MEAT_BY_ID_QUERY };
