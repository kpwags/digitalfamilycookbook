import PropTypes from 'prop-types';
import { Meat } from '../components/recipes/Meat';
import { AuthGateway } from '../components/AuthGateway';

const MeatPage = ({ query }) => (
    <AuthGateway redirectUrl={`/category?id=${query.id}`}>
        <Meat id={query.id} page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

MeatPage.propTypes = {
    query: PropTypes.object
};

export default MeatPage;
