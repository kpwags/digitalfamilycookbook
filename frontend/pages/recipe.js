import PropTypes from 'prop-types';
import { Recipe } from '../components/Recipe';
import { AuthGateway } from '../components/AuthGateway';

const RecipePage = ({ query }) => (
    <AuthGateway redirectUrl={`/recipe?id=${query.id}`}>
        <Recipe id={query.id} />
    </AuthGateway>
);

RecipePage.propTypes = {
    query: PropTypes.object
};

export default RecipePage;
