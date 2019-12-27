import { LoginForm } from '../components/LoginForm/LoginForm';
import { LoggedInUser } from '../components/LoggedInUser/LoggedInUser';
import { Homepage } from '../components/Homepage/Homepage';

const Login = () => (
    <LoggedInUser>
        {({ data: { me } }) => {
            if (me) {
                return <Homepage />;
            }

            return <LoginForm />;
        }}
    </LoggedInUser>
);

export default Login;
