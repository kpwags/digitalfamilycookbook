import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../queries/User';

const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {({ data, error, loading }) => {
            if (loading) return props.children({ data: { me: null }, error, loading });
            if (error) return props.children({ data: { me: null }, error, loading });
            return props.children({ data, error, loading });
        }}
    </Query>
);

User.propTypes = {
    children: PropTypes.func.isRequired
};

export { User };
