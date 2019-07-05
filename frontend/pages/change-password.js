import { ChangePasswordForm } from '../components/forms/user/ChangePasswordForm';
import { AuthGateway } from '../components/AuthGateway';

const EditProfile = () => (
    <>
        <AuthGateway redirectUrl="/change-password">
            <ChangePasswordForm />
        </AuthGateway>
    </>
);

export default EditProfile;
