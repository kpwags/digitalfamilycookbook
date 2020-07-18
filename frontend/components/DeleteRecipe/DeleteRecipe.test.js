import { render, screen, fireEvent, act } from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import { DELETE_RECIPE_MUTATION } from '../../mutations/Recipe';
import { ADMIN_ALL_RECIPES_QUERY } from '../../queries/Recipe';
import { TestRecipe } from '../../lib/TestUtilities';
import { DeleteRecipe } from './DeleteRecipe';
import { AppContext } from '../AppContext/AppContext';

const recipe = TestRecipe();

const mockClient = createMockClient();

const deleteRecipeMutationHandler = jest.fn().mockResolvedValue({
    data: {
        deleteRecipe: {
            id: recipe.id,
        },
    },
});

const allReciepsQueryHandler = jest.fn().mockResolvedValue({
    data: {
        recipes: [TestRecipe(), TestRecipe(), TestRecipe()],
    },
});

mockClient.setRequestHandler(DELETE_RECIPE_MUTATION, deleteRecipeMutationHandler);
mockClient.setRequestHandler(ADMIN_ALL_RECIPES_QUERY, allReciepsQueryHandler);

describe('<DeleteRecipe />', () => {
    test('it renders the delete button', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteRecipe id={recipe.id} name={recipe.name} doUpdate={false} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteRecipe>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await screen.findByText(/Delete/);
    });

    test('it deletes a recipe when the delete button followed by the confirm button is clicked', async () => {
        render(
            <ApolloProvider client={mockClient}>
                <AppContext.Provider value={{ toggleOverlay: jest.fn() }}>
                    <DeleteRecipe id={recipe.id} name={recipe.name} doUpdate={false} onComplete={() => {}} onCancel={() => {}} onError={() => {}}>
                        Delete
                    </DeleteRecipe>
                </AppContext.Provider>
            </ApolloProvider>
        );

        await act(async () => {
            fireEvent.click(await screen.getByText(/Delete/));

            await screen.findByText(/Are you sure you want to delete/);

            await fireEvent.click(await screen.getByTestId(/confirm-delete/));
        });

        expect(deleteRecipeMutationHandler).toBeCalledWith({
            id: recipe.id,
        });
    });
});
