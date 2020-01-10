/* eslint-disable import/no-extraneous-dependencies */
import casual from 'casual';
import PropTypes from 'prop-types';
import { MockedProvider } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';

const MockedThemeProvider = props => {
    const { mocks = null, children } = props;
    return (
        <ThemeProvider theme={Theme}>
            <MockedProvider mocks={mocks}>{children}</MockedProvider>
        </ThemeProvider>
    );
};

MockedThemeProvider.propTypes = {
    children: PropTypes.node,
    mocks: PropTypes.array
};

const TestCategory = () => ({
    __typename: 'Category',
    id: 'abc123',
    name: casual.words()
});

const TestDirection = () => ({
    __typename: 'Direction',
    id: casual.uuid,
    name: casual.words(),
    sortOrder: casual.integer
});

const TestIngredient = () => ({
    __typename: 'Ingredient',
    id: casual.uuid,
    name: casual.words(),
    sortOrder: casual.integer
});

const TestInvitationCode = () => ({
    __typename: 'InvitationCode',
    id: 'abc123',
    code: casual.username
});

const TestMeat = () => ({
    __typename: 'Meat',
    id: 'abc123',
    name: casual.words()
});

const TestRecipe = () => ({
    __typename: 'Recipe',
    id: 'abc123',
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
    categories: [TestCategory(), TestCategory()]
});

const TestRecipesList = () => [TestRecipe(), TestRecipe(), TestRecipe(), TestRecipe(), TestRecipe()];

const TestUser = () => ({
    __typename: 'User',
    id: 'abc123',
    name: casual.name,
    username: casual.username,
    email: casual.email,
    bio: 'I am just a test user',
    image: 'user.jpg',
    largeImage: 'user-lg.jpg',
    permissions: ['USER']
});

export {
    MockedThemeProvider,
    TestCategory,
    TestDirection,
    TestIngredient,
    TestInvitationCode,
    TestMeat,
    TestRecipe,
    TestRecipesList,
    TestUser
};
