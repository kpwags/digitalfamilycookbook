import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm/ForgotPasswordForm';
import { Homepage } from '../components/Homepage/Homepage';
import { AppContext } from '../components/AppContext/AppContext';

const ForgotPassword = props => {
    const { loggedInUser } = useContext(AppContext);

    if (loggedInUser) {
        return <Homepage query={props.query} />;
    }

    return <ForgotPasswordForm/>;
};

ForgotPassword.propTypes = {
    query: PropTypes.object
};

export default ForgotPassword;
