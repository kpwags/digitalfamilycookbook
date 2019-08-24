import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Router from 'next/router';
import { CREATE_RECIPE_MUTATION } from '../../../mutations/Recipe';
import { ALL_CATEGORIES_QUERY } from '../../../queries/Category';
import { ALL_MEATS_QUERY } from '../../../queries/Meat';
import { RecipeForm } from '../../styles/RecipeForm';
import { Trash } from '../../svg/Trash';
import { ErrorMessage } from '../../elements/ErrorMessage';
import { Utilities } from '../../../lib/Utilities';
import { FormValidator } from '../../../lib/FormValidator';

class CreateRecipeForm extends Component {
    state = {
        error: null,
        successMessage: null,
        name: '',
        public: false,
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
        ingredients: [{ key: 1, name: '' }],
        directions: [{ sortOrder: 1, direction: '' }],
        meats: [],
        categories: []
    };

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    handleIngredientChange = (e, ingredient) => {
        const { value } = e.target;

        const { ingredients } = this.state;

        ingredients.forEach(i => {
            if (i.key === ingredient.key) {
                // eslint-disable-next-line no-param-reassign
                i.name = value;
            }
        });

        this.setState({ ingredients });
    };

    addIngredient = e => {
        e.preventDefault();

        const { ingredients } = this.state;

        const nextKey = Utilities.getNextAvailableValue(ingredients);

        ingredients.push({ key: nextKey, name: '' });

        this.setState({ ingredients });
    };

    deleteIngredient = (e, ingredient) => {
        e.preventDefault();

        if (
            typeof e.keyCode === 'undefined' ||
            (typeof e.keyCode !== 'undefined' && (e.keyCode === 13 || e.keyCode === 32))
        ) {
            const { ingredients } = this.state;
            const newIngredients = ingredients.filter(i => {
                return i.key !== ingredient.key;
            });

            this.setState({ ingredients: newIngredients });
        }
    };

    handleDirectionChange = (e, direction) => {
        const { value } = e.target;

        const { directions } = this.state;

        directions.forEach(i => {
            if (i.sortOrder === direction.sortOrder) {
                // eslint-disable-next-line no-param-reassign
                i.direction = value;
            }
        });

        this.setState({ directions });
    };

    addDirection = e => {
        e.preventDefault();

        const { directions } = this.state;

        const nextSortOrder = Utilities.getNextAvailableValue(directions, 'sortOrder');

        directions.push({ sortOrder: nextSortOrder, direction: '' });

        this.setState({ directions });
    };

    deleteDirection = (e, direction) => {
        e.preventDefault();

        if (
            typeof e.keyCode === 'undefined' ||
            (typeof e.keyCode !== 'undefined' && (e.keyCode === 13 || e.keyCode === 32))
        ) {
            const { directions } = this.state;

            const newDirections = directions.filter(i => {
                return i.sortOrder !== direction.sortOrder;
            });

            this.setState({ directions: newDirections });
        }
    };

    onCategoryChange = e => {
        const { categories } = this.state;
        const categoryId = e.target.name.split('_')[1];

        if (categories.includes(categoryId)) {
            for (let i = 0; i < categories.length; i += 1) {
                if (categories[i] === categoryId) {
                    categories.splice(i, 1);
                    break;
                }
            }
        } else {
            categories.push(categoryId);
        }

        this.setState({
            categories
        });
    };

    onMeatChange = e => {
        const { meats } = this.state;
        const meatId = e.target.name.split('_')[1];

        if (meats.includes(meatId)) {
            for (let i = 0; i < meats.length; i += 1) {
                if (meats[i] === meatId) {
                    meats.splice(i, 1);
                    break;
                }
            }
        } else {
            meats.push(meatId);
        }

        this.setState({
            meats
        });
    };

    uploadFile = async e => {
        const { files } = e.target;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'digitalfamilycookbook-recipes');

        const res = await fetch('https://api.cloudinary.com/v1_1/kpwags/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();

        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url
        });
    };

    createRecipe = async (e, createRecipeMutation) => {
        e.preventDefault();

        this.setState({ error: null });

        const args = JSON.parse(JSON.stringify(this.state));

        const dbCategories = [];
        args.categories.forEach(category => {
            dbCategories.push({ id: category });
        });
        const dbMeats = [];
        args.meats.forEach(meat => {
            dbMeats.push({ id: meat });
        });

        if (args.time === '') {
            args.time = null;
        }

        if (args.activeTime === '') {
            args.activeTime = null;
        }

        if (args.servings === '') {
            args.servings = null;
        }

        if (args.calories === '') {
            args.calories = null;
        }

        if (args.protein === '') {
            args.protein = null;
        }

        if (args.carbohydrates === '') {
            args.carbohydrates = null;
        }

        if (args.fat === '') {
            args.fat = null;
        }

        if (args.cholesterol === '') {
            args.cholesterol = null;
        }

        if (args.fiber === '') {
            args.fiber = null;
        }

        if (args.sugar === '') {
            args.sugar = null;
        }

        if (this.validateForm()) {
            const recipe = await createRecipeMutation({
                variables: {
                    ...args,
                    categories: dbCategories,
                    meats: dbMeats
                }
            }).catch(err => {
                this.setState({ error: err });
            });

            Router.push({
                pathname: '/recipe',
                query: { id: recipe.data.createRecipe.id }
            });
        }
    };

    validate = e => {
        e.preventDefault();

        // eslint-disable-next-line default-case
        switch (e.target.id) {
        case 'name':
            if (!FormValidator.validateNotEmpty(this.state.name)) {
                Utilities.invalidateField('name', 'Name is required.');
            } else {
                Utilities.resetField('name');
            }
            break;
        }
    };

    validateForm = () => {
        let isValid = true;

        if (!FormValidator.validateNotEmpty(this.state.name)) {
            Utilities.invalidateField('name', 'Name is required.');
            isValid = false;
        } else {
            Utilities.resetField('name');
        }

        let hasIngredients = false;
        this.state.ingredients.forEach(i => {
            if (i.name.trim() !== '') {
                hasIngredients = true;
            }
        });

        if (!hasIngredients) {
            Utilities.invalidateFieldByClass('ingredient');
            document.getElementById('ingredients-message').innerHTML = 'At least 1 ingredient is required';
            document.getElementById('ingredients-message').style.display = 'block';
            isValid = false;
        } else {
            Utilities.resetFieldByClass('ingredient');
            document.getElementById('ingredients-message').style.display = 'none';
        }

        let hasDirections = false;
        this.state.directions.forEach(d => {
            if (d.direction.trim() !== '') {
                hasDirections = true;
            }
        });

        if (!hasDirections) {
            Utilities.invalidateFieldByClass('direction');
            document.getElementById('directions-message').innerHTML = 'At least 1 direction is required';
            document.getElementById('directions-message').style.display = 'block';
            isValid = false;
        } else {
            Utilities.resetFieldByClass('direction');
            document.getElementById('directions-message').style.display = 'none';
        }

        if (!FormValidator.validateNumeric(this.state.time)) {
            Utilities.invalidateField('time', 'Time must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('time');
        }

        if (!FormValidator.validateNumeric(this.state.activeTime)) {
            Utilities.invalidateField('activeTime', 'Active time must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('activeTime');
        }

        if (!FormValidator.validateNumeric(this.state.servings)) {
            Utilities.invalidateField('servings', 'Servings must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('servings');
        }

        if (!FormValidator.validateNumeric(this.state.calories)) {
            Utilities.invalidateField('calories', 'Calories must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('calories');
        }

        if (!FormValidator.validateNumeric(this.state.protein)) {
            Utilities.invalidateField('protein', 'Protein must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('protein');
        }

        if (!FormValidator.validateNumeric(this.state.carbohydrates)) {
            Utilities.invalidateField('carbohydrates', 'Carbohydrates must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('carbohydrates');
        }

        if (!FormValidator.validateNumeric(this.state.fat)) {
            Utilities.invalidateField('fat', 'Fat must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('fat');
        }

        if (!FormValidator.validateNumeric(this.state.sugar)) {
            Utilities.invalidateField('sugar', 'Sugar must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('sugar');
        }

        if (!FormValidator.validateNumeric(this.state.cholesterol)) {
            Utilities.invalidateField('cholesterol', 'Cholesterol must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('cholesterol');
        }

        if (!FormValidator.validateNumeric(this.state.fiber)) {
            Utilities.invalidateField('fiber', 'Fiber must be numeric');
            isValid = false;
        } else {
            Utilities.resetField('fiber');
        }

        return isValid;
    };

    render() {
        return (
            <Mutation
                mutation={CREATE_RECIPE_MUTATION}
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
                                Name <span className="required">*</span>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    onBlur={this.validate}
                                />
                                <div className="error-text" id="name-message" />
                            </label>
                            <label htmlFor="source">
                                Source
                                <input
                                    type="text"
                                    id="source"
                                    name="source"
                                    value={this.state.source}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="sourceUrl">
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

                                    <div className="error-text" id="ingredients-message" />

                                    <div id="ingredients">
                                        {this.state.ingredients.map(ingredient => (
                                            <label key={ingredient.key} htmlFor="name">
                                                <div className="ingredient">
                                                    <div className="input">
                                                        <input
                                                            type="text"
                                                            id={`ingredientname-${ingredient.key}`}
                                                            name="name"
                                                            className="ingredient"
                                                            defaultValue={ingredient.name}
                                                            onChange={e => {
                                                                this.handleIngredientChange(e, ingredient);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="delete-button">
                                                        {this.state.ingredients.length > 1 && (
                                                            <a
                                                                role="button"
                                                                tabIndex={0}
                                                                title="Delete Ingredient"
                                                                onClick={e => {
                                                                    this.deleteIngredient(e, ingredient);
                                                                }}
                                                                onKeyUp={e => {
                                                                    this.deleteIngredient(e, ingredient);
                                                                }}
                                                            >
                                                                <Trash
                                                                    width="32px"
                                                                    height="32px"
                                                                    className="delete-item"
                                                                />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={e => {
                                            this.addIngredient(e);
                                        }}
                                    >
                                        Add Ingredient
                                    </button>

                                    <h2>Directions</h2>

                                    <div className="error-text" id="directions-message" />

                                    <div id="directions">
                                        {this.state.directions.map(direction => (
                                            <label key={direction.sortOrder} htmlFor="direction">
                                                <div className="direction">
                                                    <div className="input">
                                                        <textarea
                                                            id={`directionstep-${direction.sortOrder}`}
                                                            name="direction"
                                                            className="direction"
                                                            defaultValue={direction.direction}
                                                            onChange={e => {
                                                                this.handleDirectionChange(e, direction);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="delete-button">
                                                        {this.state.directions.length > 1 && (
                                                            <a
                                                                role="button"
                                                                tabIndex={0}
                                                                title="Delete Direction"
                                                                onClick={e => {
                                                                    this.deleteDirection(e, direction);
                                                                }}
                                                                onKeyUp={e => {
                                                                    this.deleteDirection(e, direction);
                                                                }}
                                                            >
                                                                <Trash
                                                                    width="32px"
                                                                    height="32px"
                                                                    className="delete-item"
                                                                />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={e => {
                                            this.addDirection(e);
                                        }}
                                    >
                                        Add Step
                                    </button>
                                </div>

                                <div className="column2">
                                    <label htmlFor="time">
                                        Time
                                        <input
                                            type="text"
                                            id="time"
                                            name="time"
                                            className="small"
                                            value={this.state.time}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="time-message" />
                                    </label>

                                    <label htmlFor="activeTime">
                                        Active Time
                                        <input
                                            type="text"
                                            id="activeTime"
                                            name="activeTime"
                                            className="small"
                                            value={this.state.activeTime}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="activeTime-message" />
                                    </label>

                                    <label htmlFor="servings">
                                        Servings
                                        <input
                                            type="text"
                                            id="servings"
                                            name="servings"
                                            className="small"
                                            value={this.state.servings}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="servings-message" />
                                    </label>

                                    <h3>Nutrition</h3>

                                    <label htmlFor="calories">
                                        Calories
                                        <input
                                            type="text"
                                            id="calories"
                                            name="calories"
                                            className="small"
                                            value={this.state.calories}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="calories-message" />
                                    </label>

                                    <label htmlFor="protein">
                                        Protein (g)
                                        <input
                                            type="text"
                                            id="protein"
                                            name="protein"
                                            className="small"
                                            value={this.state.protein}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="protein-message" />
                                    </label>

                                    <label htmlFor="carbohydrates">
                                        Carbohydrates (g)
                                        <input
                                            type="text"
                                            id="carbohydrates"
                                            name="carbohydrates"
                                            className="small"
                                            value={this.state.carbohydrates}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="carbohydrates-message" />
                                    </label>

                                    <label htmlFor="fat">
                                        Fat (g)
                                        <input
                                            type="text"
                                            id="fat"
                                            name="fat"
                                            className="small"
                                            value={this.state.fat}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="fat-message" />
                                    </label>

                                    <label htmlFor="sugar">
                                        Sugar (g)
                                        <input
                                            type="text"
                                            id="sugar"
                                            name="sugar"
                                            className="small"
                                            value={this.state.sugar}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="sugar-message" />
                                    </label>

                                    <label htmlFor="cholesterol">
                                        Cholesterol (mg)
                                        <input
                                            type="text"
                                            id="cholesterol"
                                            name="cholesterol"
                                            className="small"
                                            value={this.state.cholesterol}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="cholesterol-message" />
                                    </label>

                                    <label htmlFor="fiber">
                                        Fiber (g)
                                        <input
                                            type="text"
                                            id="fiber"
                                            name="fiber"
                                            className="small"
                                            value={this.state.fiber}
                                            onChange={this.handleChange}
                                        />
                                        <div className="error-text" id="fiber-message" />
                                    </label>
                                </div>
                            </div>

                            <Query query={ALL_CATEGORIES_QUERY}>
                                {({ data, categoryError }) => {
                                    if (categoryError) return <p>Error: {categoryError.message}</p>;
                                    return (
                                        data.categories.length > 0 && (
                                            <>
                                                <h2>Categories</h2>
                                                <div className="categories_meats">
                                                    {data.categories.map(category => (
                                                        <label htmlFor={`category_${category.id}`} key={category.id}>
                                                            <input
                                                                type="checkbox"
                                                                name={`category_${category.id}`}
                                                                id={`category_${category.id}`}
                                                                onChange={this.onCategoryChange}
                                                                checked={!!this.state.categories.includes(category.id)}
                                                            />
                                                            {category.name}
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
                                        )
                                    );
                                }}
                            </Query>

                            <Query query={ALL_MEATS_QUERY}>
                                {({ data, meatError }) => {
                                    if (meatError) return <p>Error: {meatError.message}</p>;
                                    return (
                                        data.meats.length > 0 && (
                                            <>
                                                <h2>Meats</h2>
                                                <div className="categories_meats">
                                                    {data.meats.map(meat => (
                                                        <label htmlFor={`meat_${meat.id}`} key={meat.id}>
                                                            <input
                                                                type="checkbox"
                                                                name={`meat_${meat.id}`}
                                                                id={`meat_${meat.id}`}
                                                                onChange={this.onMeatChange}
                                                                checked={!!this.state.meats.includes(meat.id)}
                                                            />
                                                            {meat.name}
                                                        </label>
                                                    ))}
                                                </div>
                                            </>
                                        )
                                    );
                                }}
                            </Query>

                            <label htmlFor="file">
                                Image
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Upload an Image"
                                    onChange={this.uploadFile}
                                />
                                {this.state.image && (
                                    <div className="image-preview">
                                        <img src={this.state.image} alt="Upload Preview" />
                                    </div>
                                )}
                            </label>

                            <div className="save-button">
                                <button type="submit">Sav{loading ? 'ing' : 'e'}</button>
                            </div>
                        </fieldset>
                    </RecipeForm>
                )}
            </Mutation>
        );
    }
}

export { CreateRecipeForm };
