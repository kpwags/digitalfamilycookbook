import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_RECIPE_MUTATION } from '../../../mutations/Recipe';
import { RecipeForm } from '../../styles/RecipeForm';
import { Ingredient } from './Ingredient';
import { ErrorMessage } from '../../elements/ErrorMessage';

class CreateRecipeForm extends Component {
    state = {
        error: null,
        successMessage: null,
        name: '',
        public: '',
        source: '',
        sourceUrl: '',
        time: '',
        activeTime: '',
        servings: '',
        calories: '',
        carbohydrates: '',
        protein: '',
        fat: '',
        sugar: '',
        cholesterol: '',
        fiber: '',
        image: '',
        largeImage: '',
        ingredients: [],
        directions: [],
        meats: [],
        categories: []
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    createRecipe = async (e, createRecipeMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        const args = this.state;

        await createRecipeMutation({
            variables: {
                ...args
            }
        }).catch(err => {
            this.setState({ error: err });
        });
    };

    render() {
        return (
            <Mutation
                mutation={CREATE_RECIPE_MUTATION}
                variables={this.state}
                onCompleted={() => {
                    if (this.state.error === null) {
                        this.setState({
                            successMessage: 'Recipe created successfully'
                        });
                    }
                }}
            >
                {(createRecipe, { error, loading }) => (
                    <RecipeForm
                        id="create-recipe-form"
                        data-test="form"
                        method="POST"
                        onSubmit={e => {
                            this.createRecipe(e, createRecipe);
                        }}
                    >
                        <h2>Create a Recipe</h2>
                        <ErrorMessage error={error || this.state.error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="name">
                                Source
                                <input
                                    type="text"
                                    id="source"
                                    name="source"
                                    value={this.state.source}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="name">
                                Source URL
                                <input
                                    type="text"
                                    id="sourceUrl"
                                    name="sourceUrl"
                                    value={this.state.sourceUrl}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <div className="recipe-form-grid">
                                <div className="column1">
                                    <h2>Ingredients</h2>

                                    <Ingredient />

                                    <h2>Directions</h2>
                                </div>

                                <div className="column2">
                                    <label htmlFor="name">
                                        Time
                                        <input
                                            type="text"
                                            id="time"
                                            name="time"
                                            className="small"
                                            value={this.state.time}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Active Time
                                        <input
                                            type="text"
                                            id="activeTime"
                                            name="activeTime"
                                            className="small"
                                            value={this.state.activeTime}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Servings
                                        <input
                                            type="text"
                                            id="servings"
                                            name="servings"
                                            className="small"
                                            value={this.state.servings}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <h3>Nutrition</h3>

                                    <label htmlFor="name">
                                        Calories
                                        <input
                                            type="text"
                                            id="calories"
                                            name="calories"
                                            className="small"
                                            value={this.state.calories}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Protein
                                        <input
                                            type="text"
                                            id="protein"
                                            name="protein"
                                            className="small"
                                            value={this.state.protein}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Carbohydrates
                                        <input
                                            type="text"
                                            id="carbohydrates"
                                            name="carbohydrates"
                                            className="small"
                                            value={this.state.carbohydrates}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Fat
                                        <input
                                            type="text"
                                            id="fat"
                                            name="fat"
                                            className="small"
                                            value={this.state.fat}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Sugar
                                        <input
                                            type="text"
                                            id="sugar"
                                            name="sugar"
                                            className="small"
                                            value={this.state.sugar}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Cholesterol
                                        <input
                                            type="text"
                                            id="cholesterol"
                                            name="cholesterol"
                                            className="small"
                                            value={this.state.cholesterol}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="name">
                                        Fiber
                                        <input
                                            type="text"
                                            id="fiber"
                                            name="fiber"
                                            className="small"
                                            value={this.state.fiber}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
                        </fieldset>
                    </RecipeForm>
                )}
            </Mutation>
        );
    }
}

export { CreateRecipeForm };
