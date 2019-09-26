import gql from 'graphql-tag';

const CREATE_RECIPE_MUTATION = gql`
    mutation CREATE_RECIPE_MUTATION(
        $name: String!
        $public: Boolean!
        $source: String
        $sourceUrl: String
        $time: Int
        $activeTime: Int
        $servings: Float
        $calories: Float
        $carbohydrates: Float
        $protein: Float
        $fat: Float
        $sugar: Float
        $cholesterol: Float
        $fiber: Float
        $image: String
        $largeImage: String
        $ingredients: [IngredientInput]
        $directions: [DirectionInput]
        $meats: [MeatInput]
        $categories: [CategoryInput]
    ) {
        createRecipe(
            name: $name
            public: $public
            source: $source
            sourceUrl: $sourceUrl
            time: $time
            activeTime: $activeTime
            servings: $servings
            calories: $calories
            carbohydrates: $carbohydrates
            protein: $protein
            fat: $fat
            sugar: $sugar
            cholesterol: $cholesterol
            fiber: $fiber
            image: $image
            largeImage: $largeImage
            ingredients: $ingredients
            directions: $directions
            meats: $meats
            categories: $categories
        ) {
            id
        }
    }
`;

const DELETE_RECIPE_MUTATION = gql`
    mutation DELETE_RECIPE_MUTATION($id: ID!) {
        deleteRecipe(id: $id) {
            id
        }
    }
`;

const UPDATE_RECIPE_MUTATION = gql`
    mutation UPDATE_RECIPE_MUTATION(
        $id: ID!
        $name: String!
        $public: Boolean!
        $source: String
        $sourceUrl: String
        $time: Int
        $activeTime: Int
        $servings: Float
        $calories: Float
        $carbohydrates: Float
        $protein: Float
        $fat: Float
        $sugar: Float
        $cholesterol: Float
        $fiber: Float
        $image: String
        $largeImage: String
        $ingredients: [IngredientInput]
        $directions: [DirectionInput]
        $meats: [MeatInput]
        $categories: [CategoryInput]
    ) {
        updateRecipe(
            id: $id
            name: $name
            public: $public
            source: $source
            sourceUrl: $sourceUrl
            time: $time
            activeTime: $activeTime
            servings: $servings
            calories: $calories
            carbohydrates: $carbohydrates
            protein: $protein
            fat: $fat
            sugar: $sugar
            cholesterol: $cholesterol
            fiber: $fiber
            image: $image
            largeImage: $largeImage
            ingredients: $ingredients
            directions: $directions
            meats: $meats
            categories: $categories
        ) {
            id
        }
    }
`;

export { CREATE_RECIPE_MUTATION };
export { DELETE_RECIPE_MUTATION };
export { UPDATE_RECIPE_MUTATION };
