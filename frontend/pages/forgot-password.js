import { ForgotPasswordForm } from '../components/ForgotPasswordForm/ForgotPasswordForm';
import { LoggedInUser } from '../components/LoggedInUser/LoggedInUser';
import { Homepage } from '../components/Homepage/Homepage';

const ForgotPassword = () => (
    <LoggedInUser>
        {({ data: { me } }) => {
            if (me) {
                return <Homepage />;
            }

            return <ForgotPasswordForm />;
        }}
    </LoggedInUser>
);

export default ForgotPassword;
