import { MeatsGrid } from '../components/MeatsGrid';
import { AuthGateway } from '../components/AuthGateway';

const AdminMeats = () => (
    <>
        <AuthGateway>
            <h1>Manage Meats</h1>
            <MeatsGrid />
        </AuthGateway>
    </>
);

export default AdminMeats;
