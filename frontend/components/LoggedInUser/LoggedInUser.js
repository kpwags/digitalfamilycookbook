import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../../queries/User';

const LoggedInUser = props => {
    const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

    if (loading) return props.children({ data: { me: null }, error, loading });
    if (error) return props.children({ data: { me: null }, error, loading });
    return props.children({ data, error, loading });
};

LoggedInUser.propTypes = {
    children: PropTypes.func.isRequired
};

export { LoggedInUser };
