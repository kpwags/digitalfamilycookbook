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
    sortOrder: casual.integer,
});

const TestIngredient = () => ({
    __typename: 'Ingredient',
    id: casual.uuid,
    name: casual.words(),
    sortOrder: casual.integer,
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
    public: casual.boolean,
    source: casual.words(),
    sourceUrl: casual.url,
    time: casual.integer,
    activeTime: casual.integer,
    servings: casual.integer,
    calories: casual.integer,
    carbohydrates: casual.integer,
    fat: casual.integer,
    sugar: casual.integer,
    cholesterol: casual.integer,
    fiber: casual.integer,
    image: 'recipe.jpg',
    largeImage: 'recipe-large.jpg',
    ingredients: [TestIngredient(), TestIngredient()],
    directions: [TestDirection(), TestDirection()],
    meats: [TestMeat(), TestMeat()],
    categories: [TestCategory(), TestCategory()],
    user: TestUser(),
});

const TestRecipesList = () => [TestRecipe(), TestRecipe(), TestRecipe(), TestRecipe(), TestRecipe()];

export { MockedThemeProvider, TestAdmin, TestCategory, TestDirection, TestIngredient, TestInvitationCode, TestMeat, TestRecipe, TestRecipesList, TestUser };
