import { ForgotPasswordForm } from '../components/forms/user/ForgotPasswordForm';
import { User } from '../components/User';
import { Homepage } from '../components/Homepage';

const ForgotPassword = () => (
    <User>
        {({ data: { me } }) => {
            if (me) {
                return <Homepage />;
            }

            return <ForgotPasswordForm />;
        }}
    </User>
);

export default ForgotPassword;
