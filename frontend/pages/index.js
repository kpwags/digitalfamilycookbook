import PropTypes from 'prop-types';
import { MostRecent } from '../components/recipes/MostRecent';
import { AuthGateway } from '../components/AuthGateway';

const Home = ({ query }) => (
    <AuthGateway redirectUrl="/">
        <MostRecent page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

Home.propTypes = {
    query: PropTypes.object
};

export default Home;
