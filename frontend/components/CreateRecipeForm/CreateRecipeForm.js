import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { CREATE_RECIPE_MUTATION } from '../../mutations/Recipe';
import { ALL_CATEGORIES_QUERY } from '../../queries/Category';
import { ALL_MEATS_QUERY } from '../../queries/Meat';
import { RecipeForm } from '../RecipeForm/RecipeForm';
import { Trashcan } from '../Trashcan/Trashcan';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Utilities } from '../../lib/Utilities';
import { FormValidator } from '../../lib/FormValidator';
import { TextInput } from '../TextInput/TextInput';
import { TextArea } from '../TextArea/TextArea';

const CreateRecipeForm = () => {
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [description, setDescription] = useState('');
    const [source, setSource] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [time, setTime] = useState('');
    const [timeError, setTimeError] = useState('');
    const [activeTime, setActiveTime] = useState('');
    const [activeTimeError, setActiveTimeError] = useState('');
    const [servings, setServings] = useState('');
    const [servingsError, setServingsError] = useState('');
    const [calories, setCalories] = useState('');
    const [caloriesError, setCaloriesError] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [carbohydratesError, setCarbohydratesError] = useState('');
    const [protein, setProtein] = useState('');
    const [proteinError, setProteinError] = useState('');
    const [fat, setFat] = useState('');
    const [fatError, setFatError] = useState('');
    const [sugar, setSugar] = useState('');
    const [sugarError, setSugarError] = useState('');
    const [cholesterol, setCholesterol] = useState('');
    const [cholesterolError, setCholesterolError] = useState('');
    const [fiber, setFiber] = useState('');
    const [fiberError, setFiberError] = useState('');
    const [image, setImage] = useState('');
    const [largeImage, setLargeImage] = useState('');
    const [ingredients, setIngredients] = useState([
        { sortOrder: 1, name: '' },
        { sortOrder: 2, name: '' },
        { sortOrder: 3, name: '' },
    ]);
    const [ingredientsError, setIngredientsError] = useState('');
    const [directions, setDirections] = useState([
        { sortOrder: 1, direction: '' },
        { sortOrder: 2, direction: '' },
    ]);
    const [directionsError, setDirectionsError] = useState();
    const [meats, setMeats] = useState([]);
    const [categories, setCategories] = useState([]);

    const [createRecipe, { loading: createLoading, error: createError }] = useMutation(CREATE_RECIPE_MUTATION, {
        onCompleted: (data) => {
            Router.push({
                pathname: '/recipe',
                query: { id: data.createRecipe.id },
            });
        },
    });

    const { data: categoryData, error: categoriesError, loading: categoriesLoading } = useQuery(ALL_CATEGORIES_QUERY);
    const { data: meatData, error: meatsError, loading: meatsLoading } = useQuery(ALL_MEATS_QUERY);

    useEffect(() => {}, [ingredients]);

    const handleIngredientChange = (e, ingredient) => {
        const { value } = e.target;

        const tmpIngredients = [];

        ingredients.forEach((i) => {
            if (i.sortOrder === ingredient.sortOrder) {
                const ing = {
                    sortOrder: i.sortOrder,
                    name: value,
                };
                tmpIngredients.push(ing);
            } else {
                tmpIngredients.push(i);
            }
        });

        setIngredients(tmpIngredients);
    };

    const addIngredient = (e) => {
        e.preventDefault();

        const tmpIngredients = [];

        ingredients.forEach((i) => {
            tmpIngredients.push(i);
        });

        const nextKey = Utilities.getNextAvailableValue(tmpIngredients, 'sortOrder');

        tmpIngredients.push({ sortOrder: nextKey, name: '' });

        setIngredients(tmpIngredients);
    };

    const deleteIngredient = (e, ingredient) => {
        e.preventDefault();

        if (typeof e.keyCode === 'undefined' || (typeof e.keyCode !== 'undefined' && (e.keyCode === 13 || e.keyCode === 32))) {
            const newIngredients = ingredients.filter((i) => {
                return i.sortOrder !== ingredient.sortOrder;
            });

            setIngredients(newIngredients);
        }
    };

    const handleDirectionChange = (e, direction) => {
        const { value } = e.target;

        const tmpDirections = [];

        directions.forEach((d) => {
            if (d.sortOrder === direction.sortOrder) {
                const dir = {
                    sortOrder: d.sortOrder,
                    direction: value,
                };
                tmpDirections.push(dir);
            } else {
                tmpDirections.push(d);
            }
        });

        setDirections(tmpDirections);
    };

    const addDirection = (e) => {
        e.preventDefault();

        const tmpDirections = [];

        directions.forEach((d) => {
            tmpDirections.push(d);
        });

        const nextSortOrder = Utilities.getNextAvailableValue(tmpDirections, 'sortOrder');

        tmpDirections.push({ sortOrder: nextSortOrder, direction: '' });

        setDirections(tmpDirections);
    };

    const deleteDirection = (e, direction) => {
        e.preventDefault();

        if (typeof e.keyCode === 'undefined' || (typeof e.keyCode !== 'undefined' && (e.keyCode === 13 || e.keyCode === 32))) {
            const newDirections = directions.filter((i) => {
                return i.sortOrder !== direction.sortOrder;
            });

            setDirections(newDirections);
        }
    };

    const onCategoryChange = (e) => {
        const tmpCategories = [];
        const categoryId = e.target.name.split('_')[1];
        let categoryRemoved = false;

        categories.forEach((c) => {
            if (c !== categoryId) {
                tmpCategories.push(c);
            } else {
                categoryRemoved = true;
            }
        });

        if (!categoryRemoved) {
            tmpCategories.push(categoryId);
        }

        setCategories(tmpCategories);
    };

    const onMeatChange = (e) => {
        const tmpMeats = [];
        const meatId = e.target.name.split('_')[1];
        let meatRemoved = false;

        meats.forEach((m) => {
            if (m !== meatId) {
                tmpMeats.push(m);
            } else {
                meatRemoved = true;
            }
        });

        if (!meatRemoved) {
            tmpMeats.push(meatId);
        }

        setMeats(tmpMeats);
    };

    const uploadFile = async (e) => {
        const { files } = e.target;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'digitalfamilycookbook-recipes');

        const res = await fetch('https://api.cloudinary.com/v1_1/kpwags/image/upload', {
            method: 'POST',
            body: data,
        });

        const file = await res.json();

        setImage(file.secure_url);
        setLargeImage(file.eager[0].secure_url);
    };

    const validateForm = () => {
        let isValid = true;

        if (!FormValidator.validateNotEmpty(name)) {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        let hasIngredients = false;
        ingredients.forEach((i) => {
            if (i.name.trim() !== '') {
                hasIngredients = true;
            }
        });

        if (!hasIngredients) {
            setIngredientsError('At least 1 ingredient is required');
            isValid = false;
        } else {
            setIngredientsError('');
        }

        let hasDirections = false;
        directions.forEach((d) => {
            if (d.direction.trim() !== '') {
                hasDirections = true;
            }
        });

        if (!hasDirections) {
            setDirectionsError('At least 1 direction is required');
            isValid = false;
        } else {
            setDirectionsError('');
        }

        if (!FormValidator.validateNumeric(time)) {
            setTimeError('Time must be numeric');
            isValid = false;
        } else {
            setTimeError('');
        }

        if (!FormValidator.validateNumeric(activeTime)) {
            setActiveTimeError('Active time must be numeric');
            isValid = false;
        } else {
            setActiveTimeError('');
        }

        if (!FormValidator.validateNumeric(servings)) {
            setServingsError('Servings must be numeric');
            isValid = false;
        } else {
            setServingsError('');
        }

        if (!FormValidator.validateNumeric(calories)) {
            setCaloriesError('Calories must be numeric');
            isValid = false;
        } else {
            setCaloriesError('');
        }

        if (!FormValidator.validateNumeric(protein)) {
            setProteinError('Protein must be numeric');
            isValid = false;
        } else {
            setProteinError('');
        }

        if (!FormValidator.validateNumeric(carbohydrates)) {
            setCarbohydratesError('Carbohydrates must be numeric');
            isValid = false;
        } else {
            setCarbohydratesError('');
        }

        if (!FormValidator.validateNumeric(fat)) {
            setFatError('Fat must be numeric');
            isValid = false;
        } else {
            setFatError('');
        }

        if (!FormValidator.validateNumeric(cholesterol)) {
            setCholesterolError('Cholesterol must be numeric');
            isValid = false;
        } else {
            setCholesterolError('');
        }

        if (!FormValidator.validateNumeric(sugar)) {
            setSugarError('Sugar must be numeric');
            isValid = false;
        } else {
            setSugarError('');
        }

        if (!FormValidator.validateNumeric(fiber)) {
            setFiberError('Fiber must be numeric');
            isValid = false;
        } else {
            setFiberError('');
        }

        return isValid;
    };

    const saveRecipe = async (e) => {
        e.preventDefault();

        setError(null);

        const dbCategories = [];
        categories.forEach((category) => {
            dbCategories.push({ id: category });
        });

        const dbMeats = [];
        meats.forEach((meat) => {
            dbMeats.push({ id: meat });
        });

        const newRecipe = {
            name,
            description,
            source,
            sourceUrl,
            public: false,
            time: Utilities.nullifyBlankNumber(time),
            activeTime: Utilities.nullifyBlankNumber(activeTime),
            servings: Utilities.nullifyBlankNumber(servings),
            calories: Utilities.nullifyBlankNumber(calories),
            protein: Utilities.nullifyBlankNumber(protein),
            carbohydrates: Utilities.nullifyBlankNumber(carbohydrates),
            fat: Utilities.nullifyBlankNumber(fat),
            fiber: Utilities.nullifyBlankNumber(fiber),
            sugar: Utilities.nullifyBlankNumber(sugar),
            cholesterol: Utilities.nullifyBlankNumber(cholesterol),
            image,
            largeImage,
            ingredients,
            directions,
            categories: dbCategories,
            meats: dbMeats,
        };

        if (validateForm()) {
            await createRecipe({
                variables: {
                    name: newRecipe.name,
                    description: newRecipe.description,
                    public: newRecipe.public,
                    source: newRecipe.source,
                    sourceUrl: newRecipe.sourceUrl,
                    time: newRecipe.time,
                    activeTime: newRecipe.activeTime,
                    servings: newRecipe.servings,
                    calories: newRecipe.calories,
                    carbohydrates: newRecipe.carbohydrates,
                    protein: newRecipe.protein,
                    fat: newRecipe.fat,
                    sugar: newRecipe.sugar,
                    cholesterol: newRecipe.cholesterol,
                    fiber: newRecipe.fiber,
                    image: newRecipe.image,
                    largeImage: newRecipe.largeImage,
                    ingredients: newRecipe.ingredients,
                    directions: newRecipe.directions,
                    categories: newRecipe.categories,
                    meats: newRecipe.meats,
                },
            }).catch((err) => {
                setError(err);
            });
        }
    };

    return (
        <RecipeForm
            id="create-recipe-form"
            data-test="form"
            method="POST"
            onSubmit={(e) => {
                saveRecipe(e);
            }}
        >
            <h2>Create a Recipe</h2>

            <ErrorMessage error={error || createError} />

            <fieldset disabled={createLoading} aria-busy={createLoading}>
                <TextInput
                    name="name"
                    id="name"
                    label="Name"
                    value={name}
                    error={nameError}
                    validationRule="notempty"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <TextArea
                    name="description"
                    id="description"
                    label="Description"
                    value={description}
                    error=""
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />

                <TextInput
                    name="source"
                    id="source"
                    label="Source"
                    value={source}
                    error=""
                    onChange={(e) => {
                        setSource(e.target.value);
                    }}
                />

                <TextInput
                    name="sourceurl"
                    id="sourceurl"
                    label="Source URL"
                    value={sourceUrl}
                    error=""
                    onChange={(e) => {
                        setSourceUrl(e.target.value);
                    }}
                />

                <div className="recipe-form-grid">
                    <div className="ingredients-directions">
                        <h2>Ingredients</h2>

                        <div className="error-text" style={ingredientsError ? { display: 'block' } : { display: 'none' }}>
                            {ingredientsError}
                        </div>

                        <div id="ingredients">
                            {ingredients.map((ingredient) => (
                                <label key={ingredient.sortOrder} htmlFor="name">
                                    <div className="ingredient">
                                        <div className="input">
                                            <input
                                                type="text"
                                                id={`ingredientname-${ingredient.sortOrder}`}
                                                name="ingredientname"
                                                data-testid="ingredient"
                                                className="ingredient"
                                                value={ingredient.name}
                                                onChange={(e) => {
                                                    handleIngredientChange(e, ingredient);
                                                }}
                                            />
                                        </div>
                                        <div className="delete-button">
                                            {ingredients.length > 1 && (
                                                <a
                                                    role="button"
                                                    tabIndex={0}
                                                    title="Delete Ingredient"
                                                    onClick={(e) => {
                                                        deleteIngredient(e, ingredient);
                                                    }}
                                                    onKeyUp={(e) => {
                                                        deleteIngredient(e, ingredient);
                                                    }}
                                                >
                                                    <Trashcan width="32px" height="32px" className="delete-item" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                addIngredient(e);
                            }}
                        >
                            Add Ingredient
                        </button>

                        <h2>Directions</h2>

                        <div className="error-text" style={directionsError ? { display: 'block' } : { display: 'none' }}>
                            {directionsError}
                        </div>

                        <div id="directions">
                            {directions.map((direction) => (
                                <label key={direction.sortOrder} htmlFor="direction">
                                    <div className="direction">
                                        <div className="input">
                                            <textarea
                                                id={`directionstep-${direction.sortOrder}`}
                                                name="direction"
                                                className="direction"
                                                data-testid="direction"
                                                defaultValue={direction.direction}
                                                onChange={(e) => {
                                                    handleDirectionChange(e, direction);
                                                }}
                                            />
                                        </div>
                                        <div className="delete-button">
                                            {directions.length > 1 && (
                                                <a
                                                    role="button"
                                                    tabIndex={0}
                                                    title="Delete Direction"
                                                    onClick={(e) => {
                                                        deleteDirection(e, direction);
                                                    }}
                                                    onKeyUp={(e) => {
                                                        deleteDirection(e, direction);
                                                    }}
                                                >
                                                    <Trashcan width="32px" height="32px" className="delete-item" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                addDirection(e);
                            }}
                        >
                            Add Step
                        </button>
                    </div>

                    <div className="time-nutrition">
                        <TextInput
                            id="time"
                            name="time"
                            label="Time"
                            value={time}
                            error={timeError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setTime(e.target.value);
                            }}
                        />

                        <TextInput
                            id="activetime"
                            name="activetime"
                            label="Active Time"
                            value={activeTime}
                            error={activeTimeError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setActiveTime(e.target.value);
                            }}
                        />

                        <TextInput
                            id="servings"
                            name="servings"
                            label="Servings"
                            value={servings}
                            error={servingsError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setServings(e.target.value);
                            }}
                        />

                        <h3>Nutrition</h3>

                        <TextInput
                            id="calories"
                            name="calories"
                            label="Calories"
                            value={calories}
                            error={caloriesError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setCalories(e.target.value);
                            }}
                        />

                        <TextInput
                            id="protein"
                            name="protein"
                            label="Protein (g)"
                            value={protein}
                            error={proteinError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setProtein(e.target.value);
                            }}
                        />

                        <TextInput
                            id="carbohyrdates"
                            name="carbohydrates"
                            label="Carbohydrates (g)"
                            value={carbohydrates}
                            error={carbohydratesError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setCarbohydrates(e.target.value);
                            }}
                        />

                        <TextInput
                            id="fat"
                            name="fat"
                            label="Fat (g)"
                            value={fat}
                            error={fatError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setFat(e.target.value);
                            }}
                        />

                        <TextInput
                            id="sugar"
                            name="sugar"
                            label="Sugar (g)"
                            value={sugar}
                            error={sugarError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setSugar(e.target.value);
                            }}
                        />

                        <TextInput
                            id="cholesterol"
                            name="cholesterol"
                            label="Cholesterol (mg)"
                            value={cholesterol}
                            error={cholesterolError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setCholesterol(e.target.value);
                            }}
                        />

                        <TextInput
                            id="fiber"
                            name="fiber"
                            label="Fiber (g)"
                            value={fiber}
                            error={fiberError}
                            validationRule="numeric"
                            onChange={(e) => {
                                setFiber(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {!categoriesLoading && !categoriesError && categoryData.categories.length > 0 && (
                    <>
                        <h2>Categories</h2>
                        <div className="categories_meats">
                            {categoryData.categories.map((category) => (
                                <label htmlFor={`category_${category.id}`} key={category.id}>
                                    <input
                                        type="checkbox"
                                        name={`category_${category.id}`}
                                        data-testid="category"
                                        id={`category_${category.id}`}
                                        onChange={onCategoryChange}
                                        checked={!!categories.includes(category.id)}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {!meatsLoading && !meatsError && meatData.meats.length > 0 && (
                    <>
                        <h2>Meats</h2>
                        <div className="categories_meats">
                            {meatData.meats.map((meat) => (
                                <label htmlFor={`meat_${meat.id}`} key={meat.id}>
                                    <input
                                        type="checkbox"
                                        name={`meat_${meat.id}`}
                                        data-testid="meat"
                                        id={`meat_${meat.id}`}
                                        onChange={onMeatChange}
                                        checked={!!meats.includes(meat.id)}
                                    />
                                    {meat.name}
                                </label>
                            ))}
                        </div>
                    </>
                )}

                <label htmlFor="file">
                    Image
                    <input type="file" id="file" name="file" placeholder="Upload an Image" onChange={uploadFile} />
                    {image !== '' && (
                        <div className="image-preview">
                            <img src={image} alt="Upload Preview" />
                        </div>
                    )}
                </label>

                <div className="save-button">
                    <button type="submit" data-testid="submitbutton">
                        Sav{createLoading ? 'ing' : 'e'}
                    </button>
                </div>
            </fieldset>
        </RecipeForm>
    );
};

export { CreateRecipeForm };
