import PropTypes from 'prop-types';
import { Recipe } from '../components/Recipe';

const RecipePage = ({ query }) => (
    <>
        <Recipe id={query.id} />
    </>
);

RecipePage.propTypes = {
    query: PropTypes.object
};

export default RecipePage;
