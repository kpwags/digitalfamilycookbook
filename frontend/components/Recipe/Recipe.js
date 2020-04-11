import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { editMode } from '../../config';
import { RECIPE_BY_ID_QUERY } from '../../queries/Recipe';
import { AppContext } from '../AppContext/AppContext';
import { RecipeView } from '../RecipeView/RecipeView';
import { Utilities } from '../../lib/Utilities';
import { LoadingBox } from '../LoadingBox/LoadingBox';
import { PageError } from '../PageError/PageError';

const Recipe = (props) => {
    const { loggedInUser } = useContext(AppContext);

    const { data, error, loading } = useQuery(RECIPE_BY_ID_QUERY, {
        variables: { id: props.id },
    });

    if (loading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipe',
                    Message: error,
                }}
            />
        );

    const noNutritionInfo =
        data.recipe.calories === null &&
        data.recipe.fat === null &&
        data.recipe.carbohydrates === null &&
        data.recipe.protein === null &&
        data.recipe.cholesterol === null &&
        data.recipe.sugar === null &&
        data.recipe.fiber === null;

    return data.recipe !== null ? (
        <RecipeView>
            <h1>{data.recipe.name}</h1>

            <div className="main">
                <div className="left-column">
                    <p className="details">
                        <strong>Added By:</strong>&nbsp;
                        <Link href={`/recipes?userid=${data.recipe.user.id}`}>
                            <a>{data.recipe.user.name}</a>
                        </Link>
                    </p>

                    {data.recipe.source && (
                        <p className="details">
                            <strong>Source:</strong>&nbsp;
                            {data.recipe.sourceUrl ? (
                                <a href={data.recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                                    {data.recipe.source}
                                </a>
                            ) : (
                                <>{data.recipe.source}</>
                            )}
                        </p>
                    )}

                    {data.recipe.servings && (
                        <p className="details">
                            <strong>Servings:</strong>&nbsp;
                            {data.recipe.servings}
                        </p>
                    )}

                    {data.recipe.time && (
                        <p className="details">
                            <strong>Time:</strong>&nbsp;
                            {Utilities.convertCookingTime(data.recipe.time)}
                        </p>
                    )}

                    {data.recipe.activeTime && (
                        <p className="details">
                            <strong>Active Time:</strong>&nbsp;
                            {Utilities.convertCookingTime(data.recipe.activeTime)}
                        </p>
                    )}

                    {data.recipe.categories.length > 0 && (
                        <div className="tags hide-print">
                            <h4>Categories:</h4>
                            {data.recipe.categories.map((category, idx) => (
                                <Link href={`/category?id=${category.id}`} key={category.id}>
                                    <a className="tag">{category.name}</a>
                                </Link>
                            ))}
                        </div>
                    )}

                    {data.recipe.meats.length > 0 && (
                        <div className="tags hide-print">
                            <h4>Meats:</h4>
                            {data.recipe.meats.map((meat, idx) => (
                                <Link href={`/meat?id=${meat.id}`} key={meat.id}>
                                    <a className="tag">{meat.name}</a>
                                </Link>
                            ))}
                        </div>
                    )}

                    <h2>Ingredients</h2>
                    <ul className="ingredients">
                        {data.recipe.ingredients.map((ingredient) => (
                            <li key={ingredient.sortOrder}>{ingredient.name} </li>
                        ))}
                    </ul>

                    <h2>Directions</h2>
                    <ol className="directions">
                        {data.recipe.directions.map((direction) => (
                            <li key={direction.sortOrder}>{direction.direction} </li>
                        ))}
                    </ol>
                </div>
                {(!noNutritionInfo || data.recipe.largeImage) && (
                    <div className="right-column">
                        {data.recipe.largeImage && (
                            <div className="recipe-image hide-print">
                                <img src={data.recipe.largeImage} alt={data.recipe.name} />
                            </div>
                        )}

                        {!noNutritionInfo && (
                            <div className="info">
                                <div className="content">
                                    <h3>Nutrition Facts</h3>
                                    {data.recipe.calories !== null && (
                                        <div className="nutrition-data-calories">
                                            <div className="item">Calories</div>
                                            <div className="value">{data.recipe.calories}</div>
                                        </div>
                                    )}
                                    {data.recipe.protein !== null && (
                                        <div className="nutrition-data noborder">
                                            <div className="item">Protein</div>
                                            <div className="value">{data.recipe.protein}g</div>
                                        </div>
                                    )}
                                    {data.recipe.carbohydrates !== null && (
                                        <div className="nutrition-data">
                                            <div className="item">Carbohydrates</div>
                                            <div className="value">{data.recipe.carbohydrates}g</div>
                                        </div>
                                    )}
                                    {data.recipe.fat !== null && (
                                        <div className="nutrition-data">
                                            <div className="item">Fat</div>
                                            <div className="value">{data.recipe.fat}g</div>
                                        </div>
                                    )}
                                    {data.recipe.cholesterol !== null && (
                                        <div className="nutrition-data">
                                            <div className="item">Cholesterol</div>
                                            <div className="value">{data.recipe.cholesterol}mg</div>
                                        </div>
                                    )}
                                    {data.recipe.fiber !== null && (
                                        <div className="nutrition-data">
                                            <div className="item">Fiber</div>
                                            <div className="value">{data.recipe.fiber}g</div>
                                        </div>
                                    )}
                                    {data.recipe.sugar !== null && (
                                        <div className="nutrition-data noborder">
                                            <div className="item">Sugar</div>
                                            <div className="value">{data.recipe.sugar}g</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {loggedInUser && (loggedInUser.permissions.includes('ADMIN') || loggedInUser.id === data.recipe.user.id || editMode === 'ALL') && (
                <p className="hide-print">
                    <Link href={`/edit-recipe?id=${data.recipe.id}&returnpage=view`}>
                        <a>Edit Recipe</a>
                    </Link>
                </p>
            )}
        </RecipeView>
    ) : (
        <RecipeView>
            <h1>Recipe not found</h1>
            <p>The recipe you're looking for does not exist.</p>
        </RecipeView>
    );
};

Recipe.propTypes = {
    id: PropTypes.string,
};

export { Recipe };
