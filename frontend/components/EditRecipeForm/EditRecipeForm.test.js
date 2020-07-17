import { screen, render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { UPDATE_RECIPE_MUTATION } from '../../mutations/Recipe';
import { RECIPE_BY_ID_QUERY } from '../../queries/Recipe';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { TestRecipe, TestCategory, TestMeat } from '../../lib/TestUtilities';
import { EditRecipeForm } from './EditRecipeForm';

const testRecipe = TestRecipe();
const mockClient = createMockClient();

const updateRecipeHandler = jest.fn().mockResolvedValue({
    data: {
        updateRecipe: {
            id: testRecipe.id,
            name: testRecipe.name,
        },
    },
});

const recipeQueryHandler = jest.fn().mockResolvedValue({
    data: {
        recipe: {
            id: testRecipe.id,
            name: testRecipe.name,
            description: testRecipe.description,
            public: false,
            source: testRecipe.source,
            sourceUrl: testRecipe.sourceUrl,
            time: testRecipe.time,
            activeTime: testRecipe.activeTime,
            servings: testRecipe.servings,
            calories: testRecipe.calories,
            carbohydrates: testRecipe.carbohydrates,
            protein: testRecipe.protein,
            fat: testRecipe.fat,
            sugar: testRecipe.sugar,
            cholesterol: testRecipe.cholesterol,
            fiber: testRecipe.fiber,
            image: testRecipe.image,
            largeImage: testRecipe.largeImage,
            ingredients: [
                {
                    name: testRecipe.ingredients[0].name,
                    sortOrder: testRecipe.ingredients[0].sortOrder,
                },
                {
                    name: testRecipe.ingredients[1].name,
                    sortOrder: testRecipe.ingredients[1].sortOrder,
                },
                {
                    name: testRecipe.ingredients[1].name,
                    sortOrder: testRecipe.ingredients[1].sortOrder,
                },
            ],
            directions: [
                {
                    direction: testRecipe.directions[0].name,
                    sortOrder: testRecipe.directions[0].sortOrder,
                },
                {
                    direction: testRecipe.directions[1].name,
                    sortOrder: testRecipe.directions[1].sortOrder,
                },
            ],
            meats: [
                {
                    id: testRecipe.meats[0].id,
                    name: testRecipe.meats[0].name,
                },
                {
                    id: testRecipe.meats[1].id,
                    name: testRecipe.meats[1].name,
                },
            ],
            categories: [
                {
                    id: testRecipe.categories[0].id,
                    name: testRecipe.categories[0].name,
                },
                {
                    id: testRecipe.categories[1].id,
                    name: testRecipe.categories[1].name,
                },
            ],
            user: {
                id: testRecipe.user.id,
                name: testRecipe.user.name,
            },
        },
    },
});

const categories = [testRecipe.categories[0], testRecipe.categories[1], TestCategory(), TestCategory(), TestCategory(), TestCategory()];
const categoriesHandler = jest.fn().mockResolvedValue({
    data: {
        categories,
    },
});

const meats = [testRecipe.meats[0], testRecipe.meats[1], TestMeat(), TestMeat(), TestMeat(), TestMeat()];
const meatsHandler = jest.fn().mockResolvedValue({
    data: {
        meats,
    },
});

mockClient.setRequestHandler(UPDATE_RECIPE_MUTATION, updateRecipeHandler);
mockClient.setRequestHandler(ALL_CATEGORIES_QUERY, categoriesHandler);
mockClient.setRequestHandler(ALL_MEATS_QUERY, meatsHandler);
mockClient.setRequestHandler(RECIPE_BY_ID_QUERY, recipeQueryHandler);

describe('<EditRecipeForm />', () => {
    test('it renders the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <EditRecipeForm previousPage="admin" recipe={testRecipe} />
            </ApolloProvider>
        );

        const name = await screen.findByLabelText(/Name/);
        expect(name.value).toBe(testRecipe.name);

        const description = await screen.findByLabelText(/Description/);
        expect(description.value).toBe(testRecipe.description);

        const source = await screen.findByLabelText('Source');
        expect(source.value).toBe(testRecipe.source);

        const sourceUrl = await screen.findByLabelText('Source URL');
        expect(sourceUrl.value).toBe(testRecipe.sourceUrl);

        const time = await screen.findByLabelText('Time');
        expect(time.value).toBe(testRecipe.time.toString());

        const activeTime = await screen.findByLabelText('Active Time');
        expect(activeTime.value).toBe(testRecipe.activeTime.toString());

        const servings = await screen.findByLabelText(/Servings/);
        expect(servings.value).toBe(testRecipe.servings.toString());

        const calories = await screen.findByLabelText(/Calories/);
        expect(calories.value).toBe(testRecipe.calories.toString());

        const protein = await screen.findByLabelText(/Protein/);
        expect(protein.value).toBe(testRecipe.protein.toString());

        const carbohydrates = await screen.findByLabelText(/Carbohydrates/);
        expect(carbohydrates.value).toBe(testRecipe.carbohydrates.toString());

        const fat = await screen.findByLabelText(/Fat/);
        expect(fat.value).toBe(testRecipe.fat.toString());

        const fiber = await screen.findByLabelText(/Fiber/);
        expect(fiber.value).toBe(testRecipe.fiber.toString());

        const cholesterol = await screen.findByLabelText(/Cholesterol/);
        expect(cholesterol.value).toBe(testRecipe.cholesterol.toString());

        const sugar = await screen.findByLabelText(/Sugar/);
        expect(sugar.value).toBe(testRecipe.sugar.toString());

        const ingredients = await screen.findAllByTestId(/ingredient/);
        expect(ingredients).toHaveLength(testRecipe.ingredients.length);
        expect(ingredients[0].value).toBe(testRecipe.ingredients[0].name);
        expect(ingredients[1].value).toBe(testRecipe.ingredients[1].name);
        expect(ingredients[2].value).toBe(testRecipe.ingredients[2].name);

        const directions = await screen.findAllByTestId(/direction/);
        expect(directions).toHaveLength(2);
        expect(directions[0].value).toBe(testRecipe.directions[0].direction);
        expect(directions[1].value).toBe(testRecipe.directions[1].direction);

        // should have 4 categories & 4 meats
        const formCategories = await screen.findAllByTestId(/category/);
        const formMeats = await screen.findAllByTestId(/meat/);
        expect(formCategories).toHaveLength(6);
        expect(formMeats).toHaveLength(6);
    });

    test('it updates the recipe', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <EditRecipeForm previousPage="admin" recipe={testRecipe} />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Name/), ' (updated)');

            userEvent.clear(screen.getByLabelText(/Calories/));
            await userEvent.type(screen.getByLabelText(/Calories/), '1024');

            const newTime = testRecipe.time + 20;
            userEvent.clear(screen.getByLabelText('Time'));
            await userEvent.type(screen.getByLabelText('Time'), newTime.toString());

            await fireEvent.click(screen.getByTestId(/submitbutton/));
        });

        expect(updateRecipeHandler).toBeCalledWith({
            id: testRecipe.id,
            name: `${testRecipe.name} (updated)`,
            description: testRecipe.description,
            source: testRecipe.source,
            sourceUrl: testRecipe.sourceUrl,
            public: false,
            time: testRecipe.time + 20,
            activeTime: testRecipe.activeTime,
            servings: testRecipe.servings,
            calories: 1024,
            protein: testRecipe.protein,
            carbohydrates: testRecipe.carbohydrates,
            fat: testRecipe.fat,
            fiber: testRecipe.fiber,
            sugar: testRecipe.sugar,
            cholesterol: testRecipe.cholesterol,
            image: testRecipe.image,
            largeImage: testRecipe.largeImage,
            ingredients: [
                { sortOrder: testRecipe.ingredients[0].sortOrder, name: testRecipe.ingredients[0].name },
                { sortOrder: testRecipe.ingredients[1].sortOrder, name: testRecipe.ingredients[1].name },
                { sortOrder: testRecipe.ingredients[2].sortOrder, name: testRecipe.ingredients[2].name },
            ],
            directions: [
                { sortOrder: testRecipe.directions[0].sortOrder, direction: testRecipe.directions[0].direction },
                { sortOrder: testRecipe.directions[1].sortOrder, direction: testRecipe.directions[1].direction },
            ],
            categories: [{ id: testRecipe.categories[0].id }, { id: testRecipe.categories[1].id }],
            meats: [{ id: testRecipe.meats[0].id }, { id: testRecipe.meats[1].id }],
        });

        expect(Router.push).toHaveBeenCalledWith({ pathname: '/recipe', query: { id: testRecipe.id } });
    });
});
