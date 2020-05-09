import { screen, render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { CREATE_RECIPE_MUTATION } from '../../mutations/Recipe';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { TestRecipe, TestCategory, TestMeat } from '../../lib/TestUtilities';
import { CreateRecipeForm } from './CreateRecipeForm';

const testRecipe = TestRecipe();
const mockClient = createMockClient();

const createRecipeHandler = jest.fn().mockResolvedValue({
    data: {
        createRecipe: {
            id: testRecipe.id,
            name: testRecipe.name,
        },
    },
});

const categories = [TestCategory(), TestCategory(), TestCategory(), TestCategory()];
const categoriesHandler = jest.fn().mockResolvedValue({
    data: {
        categories,
    },
});

const meats = [TestMeat(), TestMeat(), TestMeat(), TestMeat()];
const meatsHandler = jest.fn().mockResolvedValue({
    data: {
        meats,
    },
});

mockClient.setRequestHandler(CREATE_RECIPE_MUTATION, createRecipeHandler);
mockClient.setRequestHandler(ALL_CATEGORIES_QUERY, categoriesHandler);
mockClient.setRequestHandler(ALL_MEATS_QUERY, meatsHandler);

// override router.push
jest.mock('next/router', () => ({ push: jest.fn() }));

describe('<CreateRecipeForm />', () => {
    test('it renders the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        await screen.findByLabelText(/Name/);
        await screen.findByLabelText(/Description/);
        await screen.findByLabelText('Source');
        await screen.findByLabelText('Source URL');
        await screen.findByLabelText('Time');
        await screen.findByLabelText('Active Time');
        await screen.findByLabelText(/Servings/);
        await screen.findByLabelText(/Calories/);
        await screen.findByLabelText(/Protein/);
        await screen.findByLabelText(/Carbohydrates/);
        await screen.findByLabelText(/Fat/);
        await screen.findByLabelText(/Fiber/);
        await screen.findByLabelText(/Cholesterol/);
        await screen.findByLabelText(/Sugar/);

        // should have 3 ingredients to start
        const ingredients = await screen.findAllByTestId(/ingredient/);
        expect(ingredients).toHaveLength(3);

        // should have 2 steps to start
        const directions = await screen.findAllByTestId(/direction/);
        expect(directions).toHaveLength(2);

        // should have 4 categories & 4 meats
        const formCategories = await screen.findAllByTestId(/category/);
        const formMeats = await screen.findAllByTestId(/meat/);
        expect(formCategories).toHaveLength(4);
        expect(formMeats).toHaveLength(4);
    });

    test('it adds an ingredient', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Add Ingredient' }));
        });

        // with the button pressed, the recipe form should now have 4 ingredients
        const ingredients = await screen.findAllByTestId(/ingredient/);
        expect(ingredients).toHaveLength(4);
    });

    test('it deletes an ingredient', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        const deleteIngredientButtons = await screen.findAllByTitle(/Delete Ingredient/);

        await act(async () => {
            fireEvent.click(deleteIngredientButtons[1]);
        });

        // with the delete button pressed, the recipe form should now have 2 ingredients
        const ingredients = await screen.findAllByTestId(/ingredient/);
        expect(ingredients).toHaveLength(2);
    });

    test('it adds a direction', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Add Step/ }));
        });

        // with the button pressed, the recipe form should now have 3 steps
        const directions = await screen.findAllByTestId(/direction/);
        expect(directions).toHaveLength(3);
    });

    test('it deletes an ingredient', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        const deleteStepButtons = await screen.findAllByTitle(/Delete Direction/);

        await act(async () => {
            fireEvent.click(deleteStepButtons[1]);
        });

        // with the delete button pressed, the recipe form should now have 1 step
        const directions = await screen.findAllByTestId(/direction/);
        expect(directions).toHaveLength(1);
    });

    test('it validates the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(screen.getByTestId(/submitbutton/));
        });

        await screen.findByText(/Name is required/);
        await screen.findByText(/At least 1 ingredient is required/);
        await screen.findByText(/At least 1 direction is required/);

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Name/), testRecipe.name);
            fireEvent.click(screen.getByTestId(/submitbutton/));
        });

        await screen.findByText(/At least 1 ingredient is required/);
        await screen.findByText(/At least 1 direction is required/);

        expect(screen.queryByText(/Name is required/)).not.toBeInTheDocument();
    });

    test('it submits the form', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <CreateRecipeForm />
            </ApolloProvider>
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText(/Name/), testRecipe.name);
            await userEvent.type(screen.getByLabelText(/Description/), testRecipe.description);
            await userEvent.type(screen.getByLabelText('Source'), testRecipe.source);
            await userEvent.type(screen.getByLabelText('Source URL'), testRecipe.sourceUrl);
            await userEvent.type(screen.getByLabelText('Time'), testRecipe.time.toString());
            await userEvent.type(screen.getByLabelText('Active Time'), testRecipe.activeTime.toString());
            await userEvent.type(screen.getByLabelText(/Servings/), testRecipe.servings.toString());
            await userEvent.type(screen.getByLabelText(/Calories/), testRecipe.calories.toString());
            await userEvent.type(screen.getByLabelText(/Protein/), testRecipe.protein.toString());
            await userEvent.type(screen.getByLabelText(/Carbohydrates/), testRecipe.carbohydrates.toString());
            await userEvent.type(screen.getByLabelText(/Fat/), testRecipe.fat.toString());
            await userEvent.type(screen.getByLabelText(/Sugar/), testRecipe.sugar.toString());
            await userEvent.type(screen.getByLabelText(/Cholesterol/), testRecipe.cholesterol.toString());
            await userEvent.type(screen.getByLabelText(/Fiber/), testRecipe.fiber.toString());

            const ingredients = await screen.findAllByTestId(/ingredient/);
            await userEvent.type(ingredients[0], testRecipe.ingredients[0].name);
            await userEvent.type(ingredients[1], testRecipe.ingredients[1].name);
            await userEvent.type(ingredients[2], testRecipe.ingredients[2].name);

            const directions = await screen.findAllByTestId(/direction/);
            await userEvent.type(directions[0], testRecipe.directions[0].name);
            await userEvent.type(directions[1], testRecipe.directions[1].name);

            const formMeats = await screen.findAllByTestId(/meat/);
            await userEvent.click(formMeats[0]);
            await userEvent.click(formMeats[1]);

            const formCategories = await screen.findAllByTestId(/category/);
            await userEvent.click(formCategories[0]);
            await userEvent.click(formCategories[1]);

            fireEvent.click(screen.getByTestId(/submitbutton/));
        });

        expect(createRecipeHandler).toBeCalledWith({
            name: testRecipe.name,
            description: testRecipe.description,
            source: testRecipe.source,
            sourceUrl: testRecipe.sourceUrl,
            public: false,
            time: testRecipe.time,
            activeTime: testRecipe.activeTime,
            servings: testRecipe.servings,
            calories: testRecipe.calories,
            protein: testRecipe.protein,
            carbohydrates: testRecipe.carbohydrates,
            fat: testRecipe.fat,
            fiber: testRecipe.fiber,
            sugar: testRecipe.sugar,
            cholesterol: testRecipe.cholesterol,
            image: '',
            largeImage: '',
            ingredients: [
                { sortOrder: 1, name: testRecipe.ingredients[0].name },
                { sortOrder: 2, name: testRecipe.ingredients[1].name },
                { sortOrder: 3, name: testRecipe.ingredients[2].name },
            ],
            directions: [
                { sortOrder: 1, direction: testRecipe.directions[0].name },
                { sortOrder: 2, direction: testRecipe.directions[1].name },
            ],
            categories: [{ id: categories[0].id }, { id: categories[1].id }],
            meats: [{ id: meats[0].id }, { id: meats[1].id }],
        });

        expect(Router.push).toHaveBeenCalledWith({ pathname: '/recipe', query: { id: testRecipe.id } });
    });
});
