import { LoginForm } from '../components/forms/user/LoginForm';
import { User } from '../components/User';
import { Homepage } from '../components/Homepage';

const Login = () => (
    <User>
        {({ data: { me } }) => {
            if (me) {
                return <Homepage />;
            }

            return <LoginForm />;
        }}
    </User>
);

export default Login;
