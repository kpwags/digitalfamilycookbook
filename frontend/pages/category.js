import PropTypes from 'prop-types';
import { Category } from '../components/recipes/Category';
import { AuthGateway } from '../components/AuthGateway';

const CategoryPage = ({ query }) => (
    <AuthGateway redirectUrl={`/category?id=${query.id}`}>
        <Category id={query.id} page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

CategoryPage.propTypes = {
    query: PropTypes.object
};

export default CategoryPage;
