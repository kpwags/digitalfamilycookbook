import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../queries/CurrentUser';

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
);

User.propTypes = {
    children: PropTypes.func.isRequired
};

export { User };
