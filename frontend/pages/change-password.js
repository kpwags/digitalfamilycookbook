import { ChangePasswordForm } from '../components/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway';

const EditProfile = () => (
    <>
        <AuthGateway redirectUrl="/change-password">
            <ChangePasswordForm />
        </AuthGateway>
    </>
);

export default EditProfile;
