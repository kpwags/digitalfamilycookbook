import { Homepage } from '../components/Homepage';
import { AuthGateway } from '../components/AuthGateway';

const Home = () => (
    <AuthGateway redirectUrl="/">
        <Homepage />
    </AuthGateway>
);

export default Home;
