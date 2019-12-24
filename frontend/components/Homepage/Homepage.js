import PropTypes from 'prop-types';
import { MostRecentRecipes } from '../MostRecentRecipes/MostRecentRecipes';

const Homepage = ({ query }) => {
    return <MostRecentRecipes page={parseInt(query.page || 1, 10)} />;
};

Homepage.propTypes = {
    query: PropTypes.object
};

export { Homepage };
