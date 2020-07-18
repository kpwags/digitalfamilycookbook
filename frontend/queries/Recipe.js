import gql from 'graphql-tag';
import { perPage } from '../config';

const ADMIN_ALL_RECIPES_QUERY = gql`
    query ADMIN_ALL_RECIPES_QUERY {
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

const ALL_RECIPES_QUERY = gql`
    query ALL_RECIPES_QUERY($first: Int = ${perPage}, $skip: Int = 0) {
        recipes(first: $first, skip: $skip, orderBy: name_ASC) {
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

const ALL_RECIPES_PAGINATION_QUERY = gql`
    query ALL_RECIPES_PAGINATION_QUERY {
        recipesConnection {
            aggregate {
                count
            }
        }
    }
`;

const MOST_RECENT_QUERY = gql`
    query MOST_RECENT_QUERY($first: Int = ${perPage}, $skip: Int = 0) {
        recipes(first: $first, skip: $skip, orderBy: createdAt_DESC) {
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

const RECIPE_BY_CATEGORY_PAGINATION_QUERY = gql`
    query RECIPE_PAGINATION_QUERY($categoryId: ID!) {
        recipesConnection(where: { categories_some: { id: $categoryId } }) {
            aggregate {
                count
            }
        }
    }
`;

const RECIPE_BY_CATEGORY_QUERY = gql`
    query RECIPE_BY_CATEGORY_QUERY($categoryId: ID!, $first: Int = ${perPage}, $skip: Int = 0) {
        recipes(first: $first, skip: $skip, orderBy: createdAt_DESC, where: { categories_some: { id: $categoryId } }) {
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
            description
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

const RECIPE_BY_MEAT_PAGINATION_QUERY = gql`
    query RECIPE_BY_MEAT_PAGINATION_QUERY($meatId: ID!) {
        recipesConnection(where: { meats_some: { id: $meatId } }) {
            aggregate {
                count
            }
        }
    }
`;

const RECIPE_BY_MEAT_QUERY = gql`
    query RECIPE_BY_MEAT_QUERY($meatId: ID!, $first: Int = ${perPage}, $skip: Int = 0) {
        recipes(first: $first, skip: $skip, orderBy: createdAt_DESC, where: { meats_some: { id: $meatId } }) {
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

const RECIPE_BY_STARTING_LETTER_QUERY = gql`
    query RECIPE_BY_STARTING_LETTER_QUERY($letter: String!) {
        recipes(orderBy: name_ASC, where: { name_starts_with: $letter }) {
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

const RECIPE_BY_USER_QUERY = gql`
    query RECIPE_BY_USER_QUERY($userId: ID!) {
        recipes(orderBy: name_ASC, where: { user: { id: $userId } }) {
            id
            name
            image
        }
    }
`;

const SEARCH_RECIPES_QUERY = gql`
    query SEARCH_RECIPES_QUERY($keywords: String!, $first: Int = ${perPage}, $skip: Int = 0) {
        recipes(first: $first, skip: $skip, orderBy: name_ASC, where: { OR: [{ name_contains: $keywords}, { ingredients_some: { name_contains: $keywords }}, { directions_some: { direction_contains: $keywords }}] }) {
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

const SEARCH_RECIPES_PAGINATION_QUERY = gql`
    query SEARCH_RECIPES_PAGINATION_QUERY($keywords: String!) {
        recipesConnection(
            where: {
                OR: [{ name_contains: $keywords }, { ingredients_some: { name_contains: $keywords } }, { directions_some: { direction_contains: $keywords } }]
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

export {
    ADMIN_ALL_RECIPES_QUERY,
    ALL_RECIPES_PAGINATION_QUERY,
    ALL_RECIPES_QUERY,
    MOST_RECENT_QUERY,
    RECIPE_BY_CATEGORY_PAGINATION_QUERY,
    RECIPE_BY_CATEGORY_QUERY,
    RECIPE_BY_ID_QUERY,
    RECIPE_BY_MEAT_PAGINATION_QUERY,
    RECIPE_BY_MEAT_QUERY,
    RECIPE_BY_STARTING_LETTER_QUERY,
    RECIPE_BY_USER_QUERY,
    SEARCH_RECIPES_QUERY,
    SEARCH_RECIPES_PAGINATION_QUERY,
};
