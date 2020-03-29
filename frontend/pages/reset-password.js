import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResetPasswordForm } from '../components/ResetPasswordForm/ResetPasswordForm';
import { Homepage } from '../components/Homepage/Homepage';
import { AppContext } from '../components/AppContext/AppContext';

const ResetPassword = props => {
    const { loggedInUser } = useContext(AppContext);
    const { resetToken } = props.query;

    if (loggedInUser || typeof resetToken === 'undefined') {
        return <Homepage query={props.query} />;
    }

    return <ResetPasswordForm resetToken={resetToken} />;
};

ResetPassword.propTypes = {
    query: PropTypes.object,
};

export default ResetPassword;
