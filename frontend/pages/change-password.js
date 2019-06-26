import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway';

const EditProfile = () => (
    <>
        <AuthGateway redirectUrl="/edit-profile">
            <ChangePasswordForm />
        </AuthGateway>
    </>
);

export default EditProfile;
