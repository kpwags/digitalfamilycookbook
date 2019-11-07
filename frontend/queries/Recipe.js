import gql from 'graphql-tag';

const ALL_RECIPES_QUERY = gql`
    query {
        recipes(orderBy: name_ASC) {
            id
            name
            image
            user {
                id
                name
            }
        }
    }
`;

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
            ingredients(orderBy: sortOrder_ASC) {
                name
                sortOrder
            }
            directions(orderBy: sortOrder_ASC) {
                direction
                sortOrder
            }
            meats(orderBy: name_ASC) {
                id
                name
            }
            categories(orderBy: name_ASC) {
                id
                name
            }
            user {
                id
                name
            }
        }
    }
`;

const MOST_RECENT_QUERY = gql`
    query {
        recipes(first: 15, skip: 0, orderBy: createdAt_DESC) {
            id
            name
            image
            user {
                id
                name
            }
        }
    }
`;

export { ALL_RECIPES_QUERY };
export { RECIPE_BY_ID_QUERY };
export { MOST_RECENT_QUERY };
