import { useContext } from 'react';
import PropTypes from 'prop-types';
import { SignupForm } from '../components/SignupForm/SignupForm';
import { Homepage } from '../components/Homepage/Homepage';
import { AppContext } from '../components/AppContext/AppContext';

const Signup = props => {
    const { loggedInUser } = useContext(AppContext);

    if (loggedInUser) {
        return <Homepage query={props.query} />;
    }

    return <SignupForm />;
};

Signup.propTypes = {
    query: PropTypes.object,
};

export default Signup;
