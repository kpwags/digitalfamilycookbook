import PropTypes from 'prop-types';
import { ResetPasswordForm } from '../components/forms/user/ResetPasswordForm';
import { User } from '../components/User';
import { Homepage } from '../components/Homepage';

const ResetPassword = props => (
    <User>
        {({ data: { me } }) => {
            if (me || typeof props.query.resetToken === 'undefined') {
                return <Homepage />;
            }

            return <ResetPasswordForm resetToken={props.query.resetToken} />;
        }}
    </User>
);

ResetPassword.propTypes = {
    query: PropTypes.object
};

export default ResetPassword;
