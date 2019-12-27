import PropTypes from 'prop-types';
import { RecipesByCategory } from '../components/RecipesByCategory/RecipesByCategory';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const CategoryPage = ({ query }) => (
    <AuthGateway redirectUrl={`/category?id=${query.id}`}>
        <RecipesByCategory id={query.id} page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

CategoryPage.propTypes = {
    query: PropTypes.object
};

export default CategoryPage;
