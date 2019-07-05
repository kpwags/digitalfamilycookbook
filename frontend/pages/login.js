import { LoginForm } from '../components/LoginForm';
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
