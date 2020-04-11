import PropTypes from 'prop-types';
import { Pagination } from '../Pagination/Pagination';
import { RecipeBox } from '../RecipeBox/RecipeBox';
import { RecipeIndex } from '../RecipeIndex/RecipeIndex';

const RecipesList = (props) => {
    const { page = null, keywords = '', recipes = [], title = null, type = 'ALL', id = null, showTitle = true, header = 'h1' } = props;

    return (
        <>
            {showTitle && header === 'h1' && <h1>{title}</h1>}
            {showTitle && header === 'h2' && <h2>{title}</h2>}

            {page !== null && <Pagination type={type} page={page} id={id} title={title} keywords={keywords} />}

            <RecipeIndex>
                {recipes.map((recipe) => (
                    <RecipeBox key={recipe.id} recipe={recipe} />
                ))}
            </RecipeIndex>

            {recipes.length === 0 && <p>No Recipes</p>}

            {page !== null && <Pagination type={type} page={page} id={id} title={title} keywords={keywords} />}
        </>
    );
};

RecipesList.propTypes = {
    page: PropTypes.number,
    recipes: PropTypes.array,
    title: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    keywords: PropTypes.string,
    showTitle: PropTypes.bool,
    header: PropTypes.string,
};

export { RecipesList };
