import { SignupForm } from '../components/forms/user/SignupForm';
import { User } from '../components/User';
import { Homepage } from '../components/Homepage';

const Signup = () => (
    <User>
        {({ data: { me } }) => {
            if (me) {
                return <Homepage />;
            }

            return <SignupForm />;
        }}
    </User>
);

export default Signup;
