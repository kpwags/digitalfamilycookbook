import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../queries/User';

const User = props => {
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

    if (loading) return props.children({ data: { me: null }, error, loading });
    if (error) return props.children({ data: { me: null }, error, loading });
    return props.children({ data, error, loading });
};

User.propTypes = {
    children: PropTypes.func.isRequired
};

export { User };
