import { SignupForm } from '../components/SignupForm/SignupForm';
import { LoggedInUser } from '../components/LoggedInUser/LoggedInUser';
import { Homepage } from '../components/Homepage/Homepage';

const Signup = () => (
    <LoggedInUser>
        {({ data: { me } }) => {
            if (me) {
                return <Homepage />;
            }

            return <SignupForm />;
        }}
    </LoggedInUser>
);

export default Signup;
