import PropTypes from 'prop-types';
import { MostRecent } from './recipes/MostRecent';

const Homepage = ({ query }) => {
    return <MostRecent page={parseInt(query.page || 1, 10)} />;
};

Homepage.propTypes = {
    query: PropTypes.object
};

export { Homepage };
