import { useContext } from 'react';
import PropTypes from 'prop-types';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Homepage } from '../components/Homepage/Homepage';
import { AppContext } from '../components/AppContext/AppContext';

const Login = props => {
    const { loggedInUser } = useContext(AppContext);

    if (loggedInUser) {
        return <Homepage query={props.query} />;
    }

    return <LoginForm />;
};

Login.propTypes = {
    query: PropTypes.object,
};

export default Login;
