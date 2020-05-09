/* eslint-disable import/no-extraneous-dependencies */
import casual from 'casual';
import PropTypes from 'prop-types';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';

const MockedThemeProvider = (props) => {
    const { mocks = null, addTypename = false, children } = props;
    return (
        <ThemeProvider theme={Theme}>
            <MockedProvider mocks={mocks} addTypename={addTypename}>
                {children}
            </MockedProvider>
        </ThemeProvider>
    );
};

MockedThemeProvider.propTypes = {
    children: PropTypes.node,
    mocks: PropTypes.array,
    addTypename: PropTypes.bool,
};

const TestAdmin = () => ({
    __typename: 'User',
    id: casual.uuid,
    name: casual.name,
    username: casual.username,
    email: casual.email,
    bio: 'I am just a test admin',
    image: 'user.jpg',
    largeImage: 'user-lg.jpg',
    permissions: ['USER', 'ADMIN'],
});

const TestCategory = () => ({
    __typename: 'Category',
    id: casual.uuid,
    name: casual.word,
    createdAt: casual.date,
});

const TestDirection = () => ({
    __typename: 'Direction',
    id: casual.uuid,
    name: casual.words(),
    sortOrder: casual.integer(1, 10),
});

const TestIngredient = () => ({
    __typename: 'Ingredient',
    id: casual.uuid,
    name: casual.words(),
    sortOrder: casual.integer(1, 10),
});

const TestInvitationCode = () => ({
    __typename: 'InvitationCode',
    id: casual.uuid,
    code: casual.word,
    createdAt: casual.date,
});

const TestMeat = () => ({
    __typename: 'Meat',
    id: casual.uuid,
    name: casual.words(),
    createdAt: casual.date,
});

const TestUser = () => ({
    __typename: 'User',
    id: casual.uuid,
    name: casual.name,
    username: casual.word,
    email: casual.email,
    bio: 'I am just a test user',
    image: 'user.jpg',
    largeImage: 'user-lg.jpg',
    permissions: ['USER'],
});

const TestRecipe = () => ({
    __typename: 'Recipe',
    id: casual.uuid,
    name: casual.name,
    description: casual.words(),
    public: casual.boolean,
    source: casual.words(),
    sourceUrl: casual.url,
    time: casual.integer(10, 60),
    activeTime: casual.integer(5, 30),
    servings: casual.integer(1, 10),
    calories: casual.integer(100, 500),
    protein: casual.integer(5, 25),
    carbohydrates: casual.integer(5, 25),
    fat: casual.integer(5, 25),
    sugar: casual.integer(5, 25),
    cholesterol: casual.integer(5, 25),
    fiber: casual.integer(5, 25),
    image: 'recipe.jpg',
    largeImage: 'recipe-large.jpg',
    ingredients: [TestIngredient(), TestIngredient(), TestIngredient()],
    directions: [TestDirection(), TestDirection()],
    meats: [TestMeat(), TestMeat()],
    categories: [TestCategory(), TestCategory()],
    user: TestUser(),
});

const TestRecipesList = () => [TestRecipe(), TestRecipe(), TestRecipe(), TestRecipe(), TestRecipe()];

export { MockedThemeProvider, TestAdmin, TestCategory, TestDirection, TestIngredient, TestInvitationCode, TestMeat, TestRecipe, TestRecipesList, TestUser };
