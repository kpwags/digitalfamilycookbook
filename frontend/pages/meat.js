import PropTypes from 'prop-types';
import { RecipesByMeat } from '../components/RecipesByMeat/RecipesByMeat';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const MeatPage = ({ query }) => (
    <AuthGateway redirectUrl={`/category?id=${query.id}`}>
        <RecipesByMeat id={query.id} page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

MeatPage.propTypes = {
    query: PropTypes.object
};

export default MeatPage;
