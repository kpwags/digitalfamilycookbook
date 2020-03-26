import PropTypes from 'prop-types';
import { ResetPasswordForm } from '../components/ResetPasswordForm/ResetPasswordForm';
import { LoggedInUser } from '../components/LoggedInUser/LoggedInUser';
import { Homepage } from '../components/Homepage/Homepage';

const ResetPassword = props => (
    <LoggedInUser>
        {({ data: { me } }) => {
            if (me || typeof props.query.resetToken === 'undefined') {
                return <Homepage query={props.query} />;
            }

            return <ResetPasswordForm resetToken={props.query.resetToken} />;
        }}
    </LoggedInUser>
);

ResetPassword.propTypes = {
    query: PropTypes.object
};

export default ResetPassword;
