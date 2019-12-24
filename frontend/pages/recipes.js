import PropTypes from 'prop-types';
import { AllRecipes } from '../components/AllRecipes/AllRecipes';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const Recipes = ({ query }) => (
    <AuthGateway redirectUrl="/">
        <AllRecipes page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

Recipes.propTypes = {
    query: PropTypes.object
};

export default Recipes;
