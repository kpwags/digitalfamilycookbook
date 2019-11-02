import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { editMode } from '../config';
import { RECIPE_BY_ID_QUERY } from '../queries/Recipe';
import { User } from './User';
import { RecipeView } from './styles/RecipeView';
import { Utilities } from '../lib/Utilities';
import { LoadingBox } from './elements/LoadingBox';
import { PageError } from './elements/PageError';

const Recipe = props => {
    const { data, error, loading } = useQuery(RECIPE_BY_ID_QUERY, { variables: { id: props.id } });

    if (loading) return <LoadingBox />;
    if (error)
        return (
            <PageError
                error={{
                    Title: 'Error Loading Recipe',
                    Message: error
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

            {data.recipe.largeImage && (
                <div className="recipe-image hide-print">
                    <img src={data.recipe.largeImage} alt={data.recipe.name} />
                </div>
            )}

            <div className="main">
                <div className="recipe-details">
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
                                <Link href={data.recipe.sourceUrl}>
                                    <a target="_blank" rel="nofollow">
                                        {data.recipe.source}
                                    </a>
                                </Link>
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
                            <strong>Time:</strong>&nbsp;{Utilities.convertCookingTime(data.recipe.time)}
                        </p>
                    )}

                    {data.recipe.activeTime && (
                        <p className="details">
                            <strong>Active Time:</strong>&nbsp;
                            {Utilities.convertCookingTime(data.recipe.activeTime)}
                        </p>
                    )}

                    {data.recipe.categories.length > 0 && (
                        <p className="details hide-print">
                            <strong>Categories:</strong>&nbsp;
                            {data.recipe.categories.map((category, idx) => (
                                <span key={category.id}>
                                    <Link href={`/recipes?categoryid=${category.id}`}>
                                        <a>{category.name}</a>
                                    </Link>
                                    {idx !== data.recipe.categories.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>
                    )}

                    {data.recipe.meats.length > 0 && (
                        <p className="details hide-print">
                            <strong>Meats:</strong>&nbsp;
                            {data.recipe.meats.map((meat, idx) => (
                                <span key={meat.id}>
                                    <Link href={`/recipes?meatid=${meat.id}`}>
                                        <a>{meat.name}</a>
                                    </Link>
                                    {idx !== data.recipe.meats.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </p>
                    )}

                    <h2>Ingredients</h2>
                    <ul className="ingredients">
                        {data.recipe.ingredients.map(ingredient => (
                            <li key={ingredient.sortOrder}>{ingredient.name} </li>
                        ))}
                    </ul>

                    <h2>Directions</h2>
                    <ol className="directions">
                        {data.recipe.directions.map(direction => (
                            <li key={direction.sortOrder}>{direction.direction} </li>
                        ))}
                    </ol>
                </div>
                {!noNutritionInfo && (
                    <div className="nutrition">
                        <div className="info">
                            <div className="content">
                                <h3>Nutrition Facts</h3>
                                {data.recipe.calories !== null && (
                                    <div className="nutrition-data-calories">
                                        <div className="item">Calories</div>
                                        <div className="value">{data.recipe.calories}</div>
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
                                {data.recipe.carbohydrates !== null && (
                                    <div className="nutrition-data">
                                        <div className="item">Carbohydrates</div>
                                        <div className="value">{data.recipe.carbohydrates}g</div>
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
                                {data.recipe.protein !== null && (
                                    <div className="nutrition-data noborder">
                                        <div className="item">Protein</div>
                                        <div className="value">{data.recipe.protein}g</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <User>
                {({ data: { me } }) => (
                    <>
                        {me &&
                            (me.permissions.includes('ADMIN') ||
                                me.id === data.recipe.user.id ||
                                editMode === 'ALL') && (
                            <p className="hide-print">
                                <Link href={`/edit-recipe?id=${data.recipe.id}&returnpage=view`}>
                                    <a>Edit Recipe</a>
                                </Link>
                            </p>
                        )}
                    </>
                )}
            </User>
        </RecipeView>
    ) : (
        <RecipeView>
            <h1>Recipe not found</h1>
            <p>The recipe you're looking for does not exist.</p>
        </RecipeView>
    );
};

Recipe.propTypes = {
    id: PropTypes.string
};

export { Recipe };
