import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Utilities } from '../../lib/Utilities';
import { RecipeLink } from '../RecipeLink/RecipeLink';

const RecipeBox = (props) => {
    const { recipe } = props;

    return (
        <RecipeLink
            data-testid="RecipeBox"
            onClick={(e) => {
                e.preventDefault();
                Utilities.goToRecipe(recipe.id);
            }}
        >
            {recipe.image !== '' && recipe.image !== null && (
                <div className="image-block">
                    <img src={recipe.image} alt={recipe.name} />
                </div>
            )}

            {(recipe.image === '' || recipe.image === null) && (
                <div className="image-block">
                    <img src="images/recipe.jpg" alt="Bowl with spoon" />
                </div>
            )}

            <h2>
                <Link href={`/recipe?id=${recipe.id}`}>
                    <a>{recipe.name}</a>
                </Link>
            </h2>
        </RecipeLink>
    );
};

RecipeBox.propTypes = {
    recipe: PropTypes.object,
};

export { RecipeBox };
