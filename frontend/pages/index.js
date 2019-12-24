import PropTypes from 'prop-types';
import { MostRecentRecipes } from '../components/MostRecentRecipes/MostRecentRecipes';
import { AuthGateway } from '../components/AuthGateway/AuthGateway';

const Home = ({ query }) => (
    <AuthGateway redirectUrl="/">
        <MostRecentRecipes page={parseInt(query.page || 1, 10)} />
    </AuthGateway>
);

Home.propTypes = {
    query: PropTypes.object
};

export default Home;
