import gql from 'graphql-tag';

const RECIPE_BY_ID_QUERY = gql`
    query RECIPE_BY_ID_QUERY($id: ID!) {
        recipe(where: { id: $id }) {
            id
            name
            public
            source
            sourceUrl
            time
            activeTime
            servings
            calories
            carbohydrates
            protein
            fat
            sugar
            cholesterol
            fiber
            image
            largeImage
            ingredients {
                id
                name
            }
            directions(orderBy: sortOrder_ASC) {
                id
                direction
            }
            meats(orderBy: name_ASC) {
                id
                name
            }
            categories(orderBy: name_ASC) {
                id
                name
            }
        }
    }
`;

export { RECIPE_BY_ID_QUERY };
